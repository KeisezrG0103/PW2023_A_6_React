import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";

const Navbar_User = () => {
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
        <Nav className="ms-auto" navbarScroll>
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">My Webinar</Nav.Link>
          <Nav.Link href="#">My Learning</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar_User;
