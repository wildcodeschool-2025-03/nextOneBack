import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../Auth/LoginContext";

const AdminProtected = () => {
  const context = useContext(AuthContext);
  const user = context?.user;

  if (user?.id_role === 2) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default AdminProtected;
