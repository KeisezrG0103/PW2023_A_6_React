import React from "react";
import { Navbar, Container, Card, Button } from "react-bootstrap";
import { bahasaPemrograman } from "../../constant/BahasaPemrograman";
import { useSpring, animated } from "react-spring";
import { useGetWebinarQuery } from "../../api/webinarApi";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { data, error, isLoading, refetch } = useGetWebinarQuery();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [webinarPerPage, setWebinarPerPage] = useState(5);

  const nPage = Math.ceil(data?.webinar.length / webinarPerPage);

  const indexOfLastWebinar = currentPage * webinarPerPage;
  const indexOfFirstWebinar = indexOfLastWebinar - webinarPerPage;

  const currentWebinar = data?.webinar.slice(
    indexOfFirstWebinar,
    indexOfLastWebinar
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  console.log(data);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getTransform = (index) => {
    return index === hoveredIndex ? "scale(1.2)" : "scale(1)";
  };

  return (
    <>
      <Container fluid className="mt-5 pt-5">
        <Card>
          <Card.Body>
            <Card.Title>Course Category</Card.Title>
          </Card.Body>
          <div className="d-flex flex-wrap justify-content-center">
            {bahasaPemrograman.map((item, index) => (
              <animated.div
                key={index}
                style={{ transform: getTransform(index) }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Card
                  key={index}
                  style={{ width: "12rem", cursor: "pointer" }}
                  className="m-3"
                  onClick={() => navigate(`/user/${item.name}`)}
                >
                  <Card.Body key={index}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Img variant="top" src={item.Image} />
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </animated.div>
            ))}
          </div>
        </Card>
      </Container>

      <Container fluid className="mt-2 pt-5">
        <Card>
          <Card.Body>
            <Card.Title>Webinar</Card.Title>
          </Card.Body>

          <div className="d-flex flex-wrap justify-content-center">
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : error ? (
              window.location.reload(false)
            ) : (
              <>
                {currentWebinar.map((webinar, index) => (
                  <Card
                    key={index}
                    style={{ width: "12rem", cursor: "pointer" }}
                    className="m-3"
                    onClick={() =>
                      console.log(`Card clicked: ${webinar.title}`)
                    }
                  >
                    <Card.Body
                      key={index}
                      style={{
                        aspectRatio: "1/1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Card.Title>{webinar.title}</Card.Title>
                      <Card.Img
                        variant="top"
                        src={webinar.thumbnail}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center my-4">
                      <Link
                        to={`/user/webinar/${webinar.id}`}
                        className="text-white text-decoration-none"
                      >
                        <Button variant="primary">Detail</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                ))}
              </>
            )}
          </div>

          <div className="d-flex justify-content-center my-2">
            {nPage > 1 && (
              <Pagination>
                {Array.from({ length: nPage }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </div>
        </Card>
      </Container>
    </>
  );
};

export default Home;
