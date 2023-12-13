import React from "react";
import { bahasaPemrograman } from "../../constant/BahasaPemrograman";
import { useSpring, animated } from "react-spring";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useGetKursusByBahasaQuery } from "../../api/kursusApi";
import { Spinner } from "react-bootstrap";
const User_Category = () => {
  const param = useParams();
  const category = param.kategori;

  const { data, error, isLoading, refetch } =
    useGetKursusByBahasaQuery(category);

  console.log(data);

  const find = bahasaPemrograman.filter((item) => item.name === category);

  console.log(find);

  return (
    <Container fluid className="mt-5 pt-5">
      <Card>
        <Card.Body>
          <Card.Title>{category}</Card.Title>
          <Card.Text>{find[0].Description}</Card.Text>
        </Card.Body>
      </Card>

      <div className="d-flex flex-wrap justify-content-start my-2">
        <h5>List of Course</h5>

        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}

        <div className="my-2 w-100">
          {data?.kursus.map((item, index) => (
            <Card key={index} className="" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Img variant="top" src={item.thumbnail} />

                <Card.Footer className="d-flex justify-content-end">
                  <button className="btn btn-primary">Enroll</button>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default User_Category;
