import { useState, createContext, useContext } from "react";
import PropTypes from 'prop-types';
import AuthProvider from "./AuthProvider";

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth"))); // Needs rework
  const [error, setError] = useState(null);

  const logout = () => {
    setAuth(false);
    AuthProvider.logout();
    localStorage.setItem("auth", false);
  };

  const login = (loginData) => {
    const { email, password } = loginData;
    const userList = JSON.parse(localStorage.getItem("users"));
    const user = userList.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      const error = new Error("Invalid email or password");
      setError(error.message);
      throw error;
    }
    setAuth(true);
    localStorage.setItem("auth", true);
    AuthProvider.login(user.email);
  };

  return (
    <AuthContext.Provider value={{ auth, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, useAuthContext }
