import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
// import CreatePostPage from './components/CreatePostPage'; // Import Create Post
import AddEntryModal from "./components/AddEntryModal";
import PostDetailsPage from "./components/PostDetailsPage"; // Import Post Details

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const location = useLocation();
  const background = location.state && location.state.background;

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    // <Router>
    <>
      <Routes location={background || location}>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        >
          <Route
            path="/create"
            element={isLoggedIn ? <AddEntryModal /> : <Navigate to="/login" />} // Protected Route
          />
        </Route>

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route
          path="/create"
          element={isLoggedIn ? <CreatePostPage /> : <Navigate to="/login" />} // Protected Route
        /> */}
        <Route
          path="/entries/:id"
          element={isLoggedIn ? <PostDetailsPage /> : <Navigate to="/login" />} // Protected Route
        />
      </Routes>
      {background && (
        <Routes>
          <Route path="/create" element={<AddEntryModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
