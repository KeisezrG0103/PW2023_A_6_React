import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ token, isUser }) => {
  if (!token) {
    // If there's no token, navigate to the root ("/") route
    return <Navigate to="/" />;
  }


  // If none of the conditions are met, render the nested routes using Outlet
  return <Outlet />;
};

export default ProtectedRoutes;
