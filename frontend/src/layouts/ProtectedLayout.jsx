import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import Header from "../components/Header";

function ProtectedLayout() {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddEntryClick = () => {
    navigate("/create", { state: { background: location } });
  };

  return (
    <>
      <Header onAddEntryClick={handleAddEntryClick} />
      {auth ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
}

export default ProtectedLayout;
