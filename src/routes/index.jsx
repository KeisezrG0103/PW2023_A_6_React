import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "../pages/auth/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import User from "../pages/User";
import DashboardAdmin from "../layouts/DashboardAdmin";
import ProtectedRoutes from "./ProtectedRoutes";
import { Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AllUser from "../pages/Admin/allUser";
import Index from "../pages/Admin/Kursus";
import Create from "../pages/Admin/Kursus/CreateKursus";
import Update from "../pages/Admin/Kursus/UpdateKursus";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const selector = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setAuthenticated(selector);
  }, [selector]);

  const token = localStorage.getItem("Token");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/user"
          element={<ProtectedRoutes token={token} />}
        >
          <Route path="/user" element={<User />} />
        </Route>

        <Route
          path="/admin"
          element={<ProtectedRoutes token={token} />}
        >
          <Route path="/admin" element={<DashboardAdmin />}>
            <Route path="/admin/dashboard" element={<AllUser />} />
            <Route path="/admin/kursus"  element={<Index />} />
            <Route path="/admin/kursus/create"  element={<Create />} />
            <Route path="/admin/kursus/:id"  element={<Update />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
