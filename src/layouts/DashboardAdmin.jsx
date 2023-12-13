import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Webinar from ".././assets/webinar_.png";
import { Button } from "react-bootstrap";
import { Logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../slicers/auth/auth_slice";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const DashboardAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = async () => {
    try {
      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleToggle = () => {
      document.body.classList.toggle("sidebar-toggled");
      document.querySelector(".sidebar").classList.toggle("toggled");
      if (document.querySelector(".sidebar").classList.contains("toggled")) {
        document.querySelectorAll(".sidebar .collapse").forEach((collapse) => {
          collapse.classList.remove("show");
        });
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.querySelectorAll(".sidebar .collapse").forEach((collapse) => {
          collapse.classList.remove("show");
        });
      }

      if (
        window.innerWidth < 480 &&
        !document.querySelector(".sidebar").classList.contains("toggled")
      ) {
        document.body.classList.add("sidebar-toggled");
        document.querySelector(".sidebar").classList.add("toggled");
        document.querySelectorAll(".sidebar .collapse").forEach((collapse) => {
          collapse.classList.remove("show");
        });
      }
    };

    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      const scrollButton = document.querySelector(".scroll-to-top");

      if (scrollButton) {
        if (scrollDistance > 100) {
          scrollButton.style.display = "block";
        } else {
          scrollButton.style.display = "none";
        }
      }
    };

    const handleScrollToTop = (e) => {
      e.preventDefault();
      const $anchor = e.target;
      const targetElement = document.querySelector(
        $anchor.getAttribute("href")
      );

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    };

    // Add event listeners
    document
      .getElementById("sidebarToggle")
      .addEventListener("click", handleToggle);
    document
      .getElementById("sidebarToggleTop")
      .addEventListener("click", handleToggle);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("scroll-to-top")) {
        handleScrollToTop(e);
      }
    });
  }, []);

 



  return (
    <>
      <div id="wrapper">
        {/* Sidebar */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* Sidebar - Brand */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="#"
          >
            <div className="mx-3">PW_UAS</div>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <div className="sidebar-heading text-center">
            <h6>
              <strong>Admin</strong>
            </h6>
          </div>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              <div>
                <IoPerson width={50} height={50} className="mx-4" />
                <span>User</span>
              </div>
            </Link>
          </li>
          {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/kursus">
              <img
                width={30}
                height={30}
                src="https://img.icons8.com/external-konkapp-outline-color-konkapp/64/external-certificate-back-to-school-konkapp-outline-color-konkapp.png"
                alt="external-certificate-back-to-school-konkapp-outline-color-konkapp"
                className="mx-4"
              />
              <span>Kursus</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/webinar">
              <img
                width={30}
                height={30}
                src={Webinar}
                alt="gambar webinar"
                className="mx-4"
              />
              <span>Webinar</span>
            </Link>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* Sidebar Toggler (Sidebar) */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
          </div>
          {/* Sidebar Message */}
        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars" />
              </button>
              {/* Topbar Search */}
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-search fa-fw" />
                  </a>
                  {/* Dropdown - Messages */}
                  <div
                    className="dropdown-menu  p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                {/* Nav Item - Alerts */}

                {/* Nav Item - Messages */}
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown d-flex align-items-start">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {user.username}
                    </span>
                    <img
                      className="img-profile rounded-circle"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    />
                  </a>
                  {/* Dropdown - User Information */}
                  <div
                    className="dropdown-menu dropdown-menu-center  shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Button variant="transparent" onClick={handleShow}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </Button>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">
              <Outlet />
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright © PW-6</span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
      {/* Logout Modal*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin akan logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardAdmin;
