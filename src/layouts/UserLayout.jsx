import React from "react";
import Navbar_User from "./Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar_User />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
