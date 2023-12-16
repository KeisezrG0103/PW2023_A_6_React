import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ token, isAdmin }) => {
  if (isAdmin == "user" || !token) {
    // If there's no token, navigate to the root ("/") route
    return <Navigate to="/user/home" />;
  }


  // If none of the conditions are met, render the nested routes using Outlet
  return <Outlet />;
};

export default AdminProtectedRoutes;
