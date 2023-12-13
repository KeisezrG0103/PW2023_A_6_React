import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetUserLoggedInQuery } from "../../api/userApi";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading, refetch } = useGetUserLoggedInQuery();
  const { register, handleSubmit, setValue } = useForm();

  console.log(user);

  const Education = [
    {
      id: 1,
      name: "Elementary",
    },
    {
      id: 2,
      name: "High School",
    },
    {
      id: 3,
      name: "Under Graduate",
    },
    {
      id: 4,
      name: "Post Graduate",
    },
    {
      id: 5,
      name: "Doctorate",
    },
  ];

  const CodingExperience = [
    {
      id: 1,
      name: "Beginner",
    },
    {
      id: 2,
      name: "Intermediete",
    },
    {
      id: 3,
      name: "Advance",
    },
  ];

  useEffect(() => {
    if (data && data.user) {
      setValue("username", data.user.username);
      setValue("email", data.user.email);
      setValue("password", data.user.password);
      setValue("education", data.user.education);
      setValue("coding_experience", data.user.coding_experience);
      setValue("password", data.user.password);
    }
    
  }, [data, setValue]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="mt-5 pt-5 mx-4 bg-body-light">
        <div className="d-flex justify-content-center">
          <Card
            bg="light"
            style={{ width: "50rem" }}
            className="p-5 rounded-3 shadow-lg border-0"
          >
            <Card.Header>Update Profile</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" {...register("username")} defaultValue={user.username} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" {...register("email")} defaultValue={user.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" {...register("password")} />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Select aria-label="Default select example" {...register("education")} defaultValue={user.education}>
                      <option>Education</option>
                      {Education.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col>
                    <Form.Select aria-label="Default select example" {...register("coding_experience")} defaultValue={user.coding_experience}>
                      <option>Coding Experience</option>
                      {CodingExperience.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="mt-3">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
