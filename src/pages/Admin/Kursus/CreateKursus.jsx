import Card from "react-bootstrap/Card";
import { bahasaPemrograman } from "../../../constant/BahasaPemrograman";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useCreateKursusMutation,
  useGetKursusByIdQuery,
} from "../../../api/kursusApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CreateUpdateKursus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const [mutate, { isLoading }] = useCreateKursusMutation();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("bahasa_pemrograman", data.bahasa_pemrograman);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      await mutate(formData).unwrap();

      toast.success("Kursus Created Successfully", {
        duration: 3000,
      });
      navigate("/admin/kursus");
    } catch (error) {
      console.log(error.data.errors.author);
      if (error.data.errors.author) {
        setError("author", {
          type: "manual",
          message: error.data.errors.author,
        });
      }
      if (error.data.errors.title) {
        setError("title", {
          type: "manual",
          message: error.data.errors.title,
        });
      }
      if (error.data.errors.bahasa_pemrograman) {
        setError("bahasa_pemrograman", {
          type: "manual",
          message: error.data.errors.bahasa_pemrograman,
        });
      }
      if (error.data.errors.thumbnail) {
        setError("thumbnail", {
          type: "manual",
          message: error.data.errors.thumbnail,
        });
      }
      if (error.data.errors.content) {
        setError("content", {
          type: "manual",
          message: error.data.errors.content,
        });
      }

      toast.error("Error creating kursus");
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <strong>Create Kursus</strong>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Title"
                  className={`${errors.title ? "is-invalid" : ""}`}
                  {...register("title")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title && errors.title.message}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Author"
                  className={`${errors.author ? "is-invalid" : ""}`}
                  {...register("author")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author && errors.author.message}
                </Form.Control.Feedback>
              </Col>


              <Col>
                <Form.Select
                  aria-label="BahasaPemrograman"
                  className={`form-select ${
                    errors.bahasa_pemrograman ? "is-invalid" : ""
                  }`}
                  {...register("bahasa_pemrograman")}
                >
                  <option value="">Bahasa Pemrograman</option>
                  {bahasaPemrograman.map((bahasa) => (
                    <option key={bahasa.id} value={bahasa.name}>
                      {bahasa.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.bahasa_pemrograman &&
                    errors.bahasa_pemrograman.message}
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Form.Group controlId="thumbnail" className="mb-3 my-2">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type="file"
                {...register("thumbnail")}
                className={errors.thumbnail ? "is-invalid" : ""}
              />
              {errors.thumbnail && (
                <Form.Control.Feedback type="invalid">
                  {errors.thumbnail.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="content" className="mb-3 my-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                className={`${errors.content ? "is-invalid" : ""}`}
                {...register("content")}
              />
              {errors.content && (
                <span className="text-danger">{errors.content.message}</span>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateUpdateKursus;
