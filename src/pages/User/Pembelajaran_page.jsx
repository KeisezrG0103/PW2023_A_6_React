import React from "react";
import { useParams } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { useGetKursusByIdQuery } from "../../api/kursusApi";
import { Spinner } from "react-bootstrap";
import { Row } from "react-bootstrap";

const Pembelajaran_page = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetKursusByIdQuery(id);

  console.log(id);
  console.log(data);

  return (
    <div className="bg-body-tertiary" style={{ minHeight: "100vh" }}>
      <div className="mt-5 pt-5 mx-4">
        <Card className="mx-auto">
          {isLoading ? (
            <div className="d-flex justify-content-center mt-3">
              <Spinner animation="border" role="status"></Spinner>
            </div>
          ) : (
            <>
              <Card.Body>
                <Card.Title>
                  <strong>{data.kursus.title}</strong>
                </Card.Title>
                <Row>
                  <Col lg={3}>
                    <Card.Img
                      variant="top"
                      src={data.kursus.thumbnail}
                      style={{ width: "100%", height: "200px" }}
                    />
                  </Col>
                  <Col lg={9}>
                    <Card.Text>
                      Jenis Bahasa Pemrograman :{" "}
                      <strong>{data?.kursus.bahasa_pemrograman}</strong>
                    </Card.Text>
                    <Card.Text>Content : {data?.kursus.content}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Pembelajaran_page;
