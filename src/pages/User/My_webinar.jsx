import React from "react";
import { useGetWebinarUserQuery } from "../../api/ikutWebinar";
import { useParams } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MyWebinar = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetWebinarUserQuery(id);

  const webinars = data?.webinar || [];


    useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
    }
    , [refetch]);
  

  return (
    <div className="my-5 pt-5 mx-4 poppinsB">
      <h2>Webinar yang telah terdaftar</h2>

      <div className="d-flex flex-wrap justify-content-center my-2">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          webinars.map((webinar, index) => (
            <Card
              key={index}
              style={{ width: "12rem", cursor: "pointer" }}
              className="m-3"
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
          ))
        )}
      </div>
    </div>
  );
};

export default MyWebinar;
