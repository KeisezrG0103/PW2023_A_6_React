import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModalSubscription from "../pages/User/ModalSubscription";
import { useGetUserLoggedInQuery } from "../api/userApi";
import { updatePembelian } from "../slicers/auth/auth_slice";
import toast from "react-hot-toast";

const Navbar_User = () => {
  const { user } = useSelector((state) => state.auth);
  const name = user.username;

  console.log(user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  const { data, error, isLoading, refetch } = useGetUserLoggedInQuery();

  useEffect(() => {
    if (data && data.user) {
      dispatch(updatePembelian(data.user.id_pembelian));
    }

    refetch();
  }, [data, dispatch]);

  const Route = [
    {
      name: "Home",
      path: "/user/home",
    },
    {
      name: "My Webinar",
      path: "/user/mywebinar",
    },
    {
      name: "Subscribe",
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
            <Nav.Link as={Link} to={item.path} key={index}>
              {item.name === "Subscribe" ? (
                user?.id_pembelian == 0 || user?.id_pembelian == null ? (
                  <Button variant="primary" onClick={handleShow}>
                    Subscribe
                  </Button>
                ) : (
                  null
                )
              ) : (
                <span
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.name}
                </span>
              )}
            </Nav.Link>
          ))}
          <NavDropdown
            title={<IoPerson />}
            id="navbarScrollingDropdown"
            align={{ lg: "end" }}
          >
            <p className="text-center">
              Hai ,<strong> {name}</strong>
            </p>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/user/profile" className="nav-link text-dark ">
                Profile
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      {show ? (
        <ModalSubscription show={show} handleClose={handleClose} />
      ) : null}
    </Navbar>
  );
};

export default Navbar_User;
