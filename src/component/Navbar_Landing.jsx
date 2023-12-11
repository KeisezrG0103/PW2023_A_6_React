import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navbar_Landing.css";

const Navbar_Landing = () => {
  const routes = [
    {
      name: "Login",
      path: "/",
    },
    {
      name: "Register",
      path: "/register",
    },
  ];
  const location = useLocation();

  return (
    <div>
      <Navbar expand="lg" className="bg-transparent">
        <Container fluid>
          <Navbar.Brand as={Link} to="#" className="text-light">
            Education
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav className="ml-auto">
              {routes.map((item, index) => (
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbar_Landing;