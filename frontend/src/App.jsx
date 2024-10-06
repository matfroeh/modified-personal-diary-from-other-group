import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AddEntryModal from "./pages/AddEntryModal";
import PostDetailsPage from "./pages/PostDetailsPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthContextProvider } from "./context/AuthContextProvider";
import AuthProvider from "./context/AuthProvider";

// TODO
// editPage

// General comments:
// - The Modal component AddEntryModal showing the background of Home while opened is realized just by the use of the Outlet component
// - The action defined here at the HomePage route is just for demonstration purposes, no real use here.
//   It works by sending the form data from AddEntryModal to HomePage, specified in the <Form> element of AddEntryModal.
//   HomePage receives the data through the useActionData hook.
// - The AuthProvider.js is a lousy attempt to implement authentication without using authContext. It works for its purposes.

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        action: async ({ request }) => {
          const res = await request.formData();
          const data = Object.fromEntries(res.entries());
          // console.log("From action:", data);
          return data;
        },
        loader: async () => await protectedEntriesLoader(),
        children: [
          {
            path: "/create",
            element: <AddEntryModal />,
          },
        ],
      },
      {
        path: "/entries/:id",
        element: <PostDetailsPage />,
        loader: async ({ params }) => protectedDetailsLoader(params),
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />;
    </AuthContextProvider>
  );
}

export default App;

function protectedEntriesLoader() {
  if (!AuthProvider.isAuthenticated) {
    console.log("redirecting to login");
    return redirect("/login");
  } else {
    console.log("fetching entries");
    return fetch(`http://localhost:3000/api/entries`);
  }
}

function protectedDetailsLoader(params) {
  if (!AuthProvider.isAuthenticated) {
    console.log("redirecting to login");
    return redirect("/login");
  } else {
    console.log("fetching details");
    return fetch(`http://localhost:3000/api/entries/${params.id}`);
  }
}
