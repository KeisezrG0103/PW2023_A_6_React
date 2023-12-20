import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../api/userApi";
import { updateProfile } from "../../slicers/auth/auth_slice";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { useGetUserLoggedInQuery } from "../../api/userApi";
import { Spinner } from "react-bootstrap";

const UpdateProfile = () => {
  const { data, error, isLoading, refetch } = useGetUserLoggedInQuery();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  const [
    updateUser,
    { data: dataUpdate, error: errorUpdate, isLoading: isLoadingUpdate },
  ] = useUpdateUserMutation();


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
      name: "Intermediate",
    },
    {
      id: 3,
      name: "Advanced",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("username", data?.user.username);
    setValue("email", data?.user.email);
    setValue("password", data?.user.password);
    setValue("education", data?.user.education);
    setValue("coding_experience", data?.user.coding_experience);
    setValue("photo", data?.user.photo);

    refetch();
  }, [setValue, data,refetch]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("education", data.education);
    formData.append("coding_experience", data.coding_experience);
    formData.append("photo", data.photo[0]);
    formData.append("_method", "PUT");

    try {
      console.log(data);

      const updatedData = await updateUser(formData).unwrap();

      dispatch(updateProfile(updatedData.data));

      toast.success("Update Profile Success");

      navigate("/user/home");
    } catch (error) {
      console.error(error);

      if (error.data && error.data.message) {
        const errorMessages = error.data.message;

        Object.keys(errorMessages).forEach((field) => {
          setError(field, {
            type: "manual",
            message: errorMessages[field][0],
          });
        });
      }
    }
  };

  return isLoading ? (
    <div className="d-flex justify-content-center mt-3">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  ) : (
    <div className="poppins" style={{ minHeight: "100vh" }}>
      <div className="mt-5 pt-5 mx-4 bg-body-light">
        <div className="d-flex justify-content-center">
          <Card
            bg="light"
            style={{ width: "50rem" }}
            className="p-5 rounded-3 shadow-lg border-0"
          >
            <Card.Header>Update Profile</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-center">
                  <Image
                    src={
                      data?.user?.photo == undefined
                        ? "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                        : data?.user?.photo
                    }
                    roundedCircle
                    style={{ width: "100px", height: "100px" }}
                    onClick={() => document.getElementById("file_up").click()}
                  />

                  <input
                    type="file"
                    id="file_up"
                    accept="image/*"
                    style={{ display: "none" }}
                    {...register("photo")}
                  />
                </div>

                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("username")}
                    defaultValue={data?.user.username}
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                  />

                  {errors.username && (
                    <Form.Control.Feedback type="invalid">
                      {errors.username.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email")}
                    defaultValue={data?.user.email}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Education</Form.Label>

                    <Form.Select
                      aria-label="education"
                      defaultValue={data?.user.education.id}
                      {...register("education")}
                      className={`form-select ${
                        errors.education ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Education</option>
                      {Education.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                      {errors.education && (
                        <Form.Control.Feedback type="invalid">
                          {errors.education.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Select>
                  </Col>

                  <Col>
                    <Form.Label>Coding Experience</Form.Label>
                    <Form.Select
                      aria-label="coding_experience"
                      defaultValue={data?.user.coding_experience.id}
                      className={`form-select ${
                        errors.coding_experience ? "is-invalid" : ""
                      }`}
                      {...register("coding_experience")}
                    >
                      <option value="">Coding Experience</option>
                      {CodingExperience.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                      {errors.coding_experience && (
                        <Form.Control.Feedback type="invalid">
                          {errors.coding_experience.message}
                        </Form.Control.Feedback>
                      )}
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
