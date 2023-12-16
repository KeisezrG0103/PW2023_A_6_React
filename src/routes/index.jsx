import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "../pages/auth/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import User from "../pages/User/Home";
import DashboardAdmin from "../layouts/DashboardAdmin";
import ProtectedRoutes from "./ProtectedRoutes";
import { Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AllUser from "../pages/Admin/AllUser";
import Index_Kursus from "../pages/Admin/Kursus";
import Create from "../pages/Admin/Kursus/CreateKursus";
import Update from "../pages/Admin/Kursus/UpdateKursus";
import Index_Webinar from "../pages/Admin/Webinar/index";
import CreateWebinar from "../pages/Admin/Webinar/CreateWebinar";
import UpdateWebinar from "../pages/Admin/Webinar/UpdateWebinar";
import Home from "../pages/User/Home";
import UserLayout from "../layouts/UserLayout";
import User_Category from "../pages/User/User_Category";
import Pembelajaran_page from "../pages/User/Pembelajaran_page";
import UpdateProfile from "../pages/User/UpdateProfile";
import WebinarDetail from "../pages/User/WebinarDetail";
import My_webinar from "../pages/User/my_webinar";
import { useEffect } from "react";
import AdminProtectedRoutes from "./AdminProtection";

const App = () => {
  const Token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);


  localStorage.setItem("Token", Token);


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/user" element={<ProtectedRoutes token={Token} />}>
          <Route path="/user" element={<UserLayout/>} >
            <Route path="/user/home" element={<Home />} />
            <Route path= "/user/:kategori" element={<User_Category />} />
            <Route path="/user/:kategori/:id" element={<Pembelajaran_page />} />
            <Route path="/user/profile" element = {<UpdateProfile />} />
            <Route path="/user/webinar/:id" element={<WebinarDetail />} />
            <Route path="/user/mywebinar/:id" element={<My_webinar />} />
          </Route> 
        </Route>

        <Route path="/admin" element={<AdminProtectedRoutes token={Token} isAdmin={user?.role} />}>
          <Route path="/admin" element={<DashboardAdmin />}>
            <Route path="/admin/dashboard" element={<AllUser />} />
            <Route path="/admin/kursus" element={<Index_Kursus />} />
            <Route path="/admin/kursus/create" element={<Create />} />
            <Route path="/admin/kursus/:id" element={<Update />} />
            <Route path="/admin/webinar" element={<Index_Webinar />} />
            <Route path="/admin/webinar/create" element={<CreateWebinar />} />
            <Route path="/admin/webinar/:id" element={<UpdateWebinar />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
