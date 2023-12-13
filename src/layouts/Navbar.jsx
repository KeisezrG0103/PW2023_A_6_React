import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { IoPerson } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { authLogout } from "../slicers/auth/auth_slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar_User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  const Route = [
    {
      name: "Home",
      path: "/user/home",
    },
    {
      name: "Subscribe",
      path: "/user/subscribe",
    },
    {
      name: "My Webinar",
      path: "/user/mywebinar",
    },
    {
      name: "My Learning",
      path: "/user/mylearning",
    },
  ];

  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      className="shadow-sm"
    >
      <Navbar.Brand className="px-4">EDUKASI</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" className="px-4">
        <Nav className="ms-auto mx-2" navbarScroll>
          {Route.map((item, index) => (
            <Nav.Link
              as={Link}
              to={item.path}
              key={index}
              className={`text-light mx-2 ${
                location.pathname === item.path ? "active-link" : ""
              }`}
            >
              {item.name}
            </Nav.Link>
          ))}
          <NavDropdown
            title={<IoPerson />}
            id="navbarScrollingDropdown"
            align={{ lg: "end" }}
          >
            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar_User;
