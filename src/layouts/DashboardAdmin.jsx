import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import Webinar from ".././assets/webinar_.png";

const DashboardAdmin = () => {

  const { user } = useSelector((state) => state.auth);

  console.log(user);

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

    // Clean up event listeners on component unmount
    return () => {
      document
        .getElementById("sidebarToggle")
        .removeEventListener("click", handleToggle);
      document
        .getElementById("sidebarToggleTop")
        .removeEventListener("click", handleToggle);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleScrollToTop);
    };
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
            <div className="mx-3">PW_UTS</div>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <a className="nav-link" href="{{url('/dashboard')}}">
              <span>Dashboard</span>
            </a>
          </li>
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
            <Link className="nav-link" to="/admin/kursus">
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
                <li className="nav-item dropdown no-arrow mx-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="alertsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bell fa-fw" />
                    {/* Counter - Alerts */}
                    <span className="badge badge-danger badge-counter">3+</span>
                  </a>
                  {/* Dropdown - Alerts */}
                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in"
                    aria-labelledby="alertsDropdown"
                  >
                    <h6 className="dropdown-header">Alerts</h6>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-book text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 12, 2019
                        </div>
                        <span className="font-weight-bold">
                          C++ Course is arrived!!
                        </span>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-book text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 12, 2019
                        </div>
                        <span className="font-weight-bold">
                          Python Course is arrived!!
                        </span>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-book text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 12, 2019
                        </div>
                        <span className="font-weight-bold">
                          Machine Learning Course is arrived!!
                        </span>
                      </div>
                    </a>
                    <a
                      className="dropdown-bs-item text-center small text-gray-500"
                      href="#"
                    >
                      Show All Alerts
                    </a>
                  </div>
                </li>
                {/* Nav Item - Messages */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="messagesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-cart-arrow-down fa-fw" />
                    {/* Counter - Messages */}
                    <span className="badge badge-danger badge-counter">7</span>
                  </a>
                  {/* Dropdown - Messages */}
                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in"
                    aria-labelledby="messagesDropdown"
                  >
                    <h6 className="dropdown-header">Cart</h6>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src="{{asset('./assets/Cpp.png')}}"
                          alt="..."
                        />
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-truncate">C++ for Dummies</div>
                        <div className="small text-gray-500">
                          by Joshua Puniwan · 58m
                        </div>
                        <div className="small text-gray-500">Rp 1.500.000</div>
                      </div>
                    </a>
                    <a
                      className="dropdown-item text-center small text-gray-500"
                      href="#"
                    >
                      More Cart
                    </a>
                  </div>
                </li>
                <div className="topbar-divider d-none d-sm-block" />
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
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
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <a className="dropdown-item" href="{{url('profil')}}">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                      Profile
                    </a>
                    <div className="dropdown-divider" />
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#logoutModal"
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
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
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select Logout below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                type="button"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <a className="btn btn-primary" href="{{url('/')}}">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
