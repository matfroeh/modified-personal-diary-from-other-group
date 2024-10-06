import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddEntryClick = () => {
    navigate("/create", { state: { background: location } });
  };

    return (
      <>
      {/* <div className="min-h-screen p-4 bg-gradient-to-b from-red-400 to-gray-700"> */}
      {/* <div className="flex justify-center mb-6">
        <img
          src="http://i.huffpost.com/gen/2395634/images/o-DIARY-facebook.jpg"
          alt="Login Illustration"
          className="h-100% w-100% sm:h-40 sm:w-40 lg:w-60 lg:h-60"
        />
      </div>
      <div className="flex justify-center mb-6">      </div> */}
        <Header onAddEntryClick={handleAddEntryClick} />


      <Outlet />
    {/* </div> */}
    </>
  );
}


export default Layout;
