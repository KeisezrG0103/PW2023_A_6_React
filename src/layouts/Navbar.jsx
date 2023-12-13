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
        <Nav className="ms-auto mx-2" navbarScroll>
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">My Webinar</Nav.Link>
          <Nav.Link href="#">My Learning</Nav.Link>
          <NavDropdown title={<IoPerson />} id="navbarScrollingDropdown"
          align={{ lg: "end" }}>
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar_User;
