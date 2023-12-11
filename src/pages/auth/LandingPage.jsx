import React from "react";
import { Col, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./LandingPage.css";
import { Card, Row } from "react-bootstrap";
import bg from "../../assets/bg.jpg";
import Carousel_Custom from "../../component/Carousel";
import Navbar_Landing from "../../component/Navbar_Landing";

const LandingPage = () => {
  return (
    <>
      <img
        src={bg}
        alt="bg"
        className="bg"
        style={{ width: "100%", height: "100%" }}
      />
      <Navbar_Landing />
      <div className="d-flex justify-content-center w-100">
        <Container className="m-4">
          <div className="d-md-flex justify-contents-center">
            <Row>
              <Col className="none">
                <Card
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    minHeight: "40rem",
                  }}
                  className="p-4 none"
                >
                  <Carousel_Custom />
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    minHeight: "40rem",
                  }}
                  className="p-4"
                >
                  <Outlet />
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LandingPage;
