import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Header({ onAddEntryClick }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (userLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
    }
    navigate("/login");
  };

  return (
    <>
      <div className="max-w-screen-sm flex flex-row justify-around mt-4 mb-6">
        <div className="w-1/3 content-center">
          <img
            src="http://i.huffpost.com/gen/2395634/images/o-DIARY-facebook.jpg"
            alt="Login Illustration"
          />
        </div>
        <div className="flex flex-none content-center">
          <header className="">
            <h1 className="text-3xl font-extrabold text-white">My Diary</h1>
            <br />
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={onAddEntryClick}
            >
              Add Entry
            </button>
            <button
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors ml-4"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </header>
        </div>
        <div className="spacer w-1/5"></div>
      </div>
    </>
  );
}

Header.propTypes = {
  onAddEntryClick: PropTypes.func.isRequired,
};

export default Header;
