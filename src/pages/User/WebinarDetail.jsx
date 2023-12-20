import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetWebinarByIdQuery } from "../../api/webinarApi";
import { useCreateWebinarUserMutation } from "../../api/ikutWebinar";
import { useIsRegisteredQuery } from "../../api/ikutWebinar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetUserLoggedInQuery } from "../../api/userApi";

const WebinarDetail = () => {
  const params = useParams();
  const id = parseInt(params.id);

  const selector = useSelector((state) => state.auth.user);

  const { data: dataUser, error: errorUser, isLoading: isLoadingUser } =
    useGetUserLoggedInQuery();

  const [isRegistered, setIsRegistered] = useState(false);

  const { data, error, isLoading, refetch } = useGetWebinarByIdQuery(id);
  const [mutate, { isLoading: isLoadingCreate }] =
    useCreateWebinarUserMutation();

  const onSubmit = async () => {
    const data_Daftar = {
      id_webinar: data.webinar.id,
      id_user: dataUser?.user.id,
    };

    try {
      await mutate(data_Daftar).unwrap();
      toast.success("Berhasil mendaftar webinar");
    } catch (error) {
      toast.error("Anda Sudah Terdaftar");
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-body-tertiary poppins" style={{ minHeight: "100vh" }}>
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
                  <strong>
                    Judul Webinar: <strong>{data.webinar.title}</strong>
                  </strong>
                </Card.Title>
                <Row>
                  <Col lg={3}>
                    <Card.Img
                      variant="top"
                      src={data.webinar.thumbnail}
                      style={{ width: "100%", height: "200px" }}
                    />
                  </Col>
                  <Col lg={9}>
                    <Card.Text>
                      Pengisi Acara:
                      <strong>{data?.webinar.pengisi_acara}</strong>
                    </Card.Text>
                    <Card.Text>Tanggal: {data?.webinar.tanggal}</Card.Text>
                    <Card.Text>Content: {data?.webinar.content}</Card.Text>

                    <Button
                      variant="primary"
                      onClick={onSubmit}
                      disabled={isLoadingCreate}
                    >
                      {isLoadingCreate ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        "Daftar"
                      )}
                    </Button>
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

export default WebinarDetail;
