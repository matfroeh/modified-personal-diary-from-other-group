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
      <Header onAddEntryClick={handleAddEntryClick} />
      <Outlet />
    </>
  );
}

export default Layout;
