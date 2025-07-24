import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { LoginContext } from "../../Auth/LoginContext";

function AdminProtected() {
  const context = useContext(LoginContext);
  if (!context) {
    return null;
  }
  const { user } = context;

  if (user?.id_role === 2) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}

export default AdminProtected;
