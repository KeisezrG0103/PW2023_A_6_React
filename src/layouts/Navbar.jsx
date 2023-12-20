import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Spinner } from "react-bootstrap";
import { IoPerson } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { authLogout } from "../slicers/auth/auth_slice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalSubscription from "../pages/User/ModalSubscription";
import { useGetUserLoggedInQuery,useGetUserByIdQuery } from "../api/userApi";
import { updatePembelian } from "../slicers/auth/auth_slice";
import toast from "react-hot-toast";
import { FaBook } from "react-icons/fa";

const Navbar_User = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const {user_selector, refetch: userRefetch} = useGetUserLoggedInQuery(user.id);

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  const { data, error, isLoading, refetch } = useGetUserLoggedInQuery();



  const Route = [
    {
      name: "Home",
      path: "/user/home",
    },
    {
      name: "My Webinar",
      path: "/user/mywebinar/:id",
    },
    {
      name: "Subscribe",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      refetch();
    }
    fetchData();
    userRefetch();
  }, [refetch, userRefetch]);

  return (
    <>
      {/* {isLoading ? (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : ( */}
        <Navbar
          expand="lg"
          bg="primary"
          variant="dark"
          fixed="top"
          className="shadow-sm"
        >
          <Navbar.Brand className="px-4 poppinsB"><FaBook className="mr-2" />Edukasi</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="px-4">
            <Nav className="ms-auto mx-2 poppinsB" navbarScroll>
              {Route.map((item, index) => (
                <Nav.Link
                  as={Link}
                  to={
                    item.path && item.path.includes(":id")
                      ? item.path.replace(":id", data?.user?.id)
                      : item.path
                  }
                  key={index}
                  onClick={() =>
                    item.name === "Subscribe" && data?.user?.id_pembelian === 0
                      ? handleShow()
                      : null
                  }
                >
                  {item.name === "Subscribe" ? (
                   user_selector?.user.id_pembelian == null ? (
                      "Subscribe"
                    ) : null
                  ) : (
                    <span
                      className={
                        location.pathname === item.path ? "active" : ""
                      }
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
                <NavDropdown.Item>
                  <Link to="/user/profile" className="nav-link text-dark ">
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button variant="danger" onClick={logout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {show ? (
            <ModalSubscription show={show} handleClose={handleClose}  id={data?.user?.id}/>
          ) : null}
        </Navbar>
      {/* )} */}
    </>
  );
};

export default Navbar_User;
