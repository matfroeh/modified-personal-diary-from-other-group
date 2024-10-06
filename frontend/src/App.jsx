import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AddEntryModal from "./components/AddEntryModal";
import PostDetailsPage from "./pages/PostDetailsPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthContextProvider } from "./context/AuthContextProvider";

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
        index: true,
        element: <HomePage />,
        loader: async () => fetch(`http://localhost:3000/api/entries`),
      },
      {
        path: "/create",
        element: <AddEntryModal />,
      },
      {
        path: "/entries/:id",
        element: <PostDetailsPage />,
        loader: async ({ params }) =>
          fetch(`http://localhost:3000/api/entries/${params.id}`),
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

// const location = useLocation();
// const background = location.state && location.state.background;

// const routerOld = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Routes location={background || location}>
//         <Route
//           path="/"
//           element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
//         >
//           <Route
//             path="/create"
//             element={
//               isLoggedIn ? <AddEntryModal /> : <Navigate to="/login" />
//             } // Protected Route
//           />
//         </Route>
//         <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route
//           path="/entries/:id"
//           element={
//             isLoggedIn ? <PostDetailsPage /> : <Navigate to="/login" />
//           } // Protected Route
//         />
//       </Routes>
//       {background && (
//         <Routes>
//           <Route path="/create" element={<AddEntryModal />} />
//         </Routes>
//       )}
//     </>
//   )
// );
