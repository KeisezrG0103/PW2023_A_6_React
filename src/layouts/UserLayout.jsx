import React from "react";
import { Navbar, Container, Card, Button } from "react-bootstrap";
import Navbar_User from "./Navbar";
import { bahasaPemrograman } from "../constant/BahasaPemrograman";
import { useSpring, animated } from "react-spring";
import { useGetWebinarQuery } from "../api/webinarApi";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar_User />
      <div className="bg-body-tertiary">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
