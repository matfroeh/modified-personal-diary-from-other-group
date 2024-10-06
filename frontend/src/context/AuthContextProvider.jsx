import { useState, createContext, useContext } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setAuth(false);
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
    localStorage.setItem("isAuthenticated", true);
    setAuth(true);
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
