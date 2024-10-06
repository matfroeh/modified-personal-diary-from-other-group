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
