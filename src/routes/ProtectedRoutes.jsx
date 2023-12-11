import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ token }) => {
  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
