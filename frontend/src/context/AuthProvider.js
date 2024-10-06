const AuthProvider = {
  isAuthenticated: JSON.parse(localStorage.getItem("auth")),
  userName: null,
  async login(userName) {
    AuthProvider.isAuthenticated = true;
    AuthProvider.userName = userName;
  },
  async logout() {
    AuthProvider.isAuthenticated = false;
    AuthProvider.userName = null;
  }
};

export default AuthProvider;
