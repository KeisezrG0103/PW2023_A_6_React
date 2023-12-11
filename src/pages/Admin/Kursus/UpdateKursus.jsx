import Card from "react-bootstrap/Card";
import { bahasaPemrograman } from "../../../constant/BahasaPemrograman";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useGetKursusByIdQuery,
  useUpdateKursusMutation
} from "../../../api/kursusApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateUpdateKursus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const [mutate, { isLoading }] = useUpdateKursusMutation();
  const id = useParams().id;
  console.log(id);
  const { data, isLoading: isLoadingGetKursusById } = useGetKursusByIdQuery(id);

  

  const onSubmit = async (data) => {
    
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
                  {...register("title")}
                />

              </Col>
              <Col>
                <Form.Control
                  placeholder="Author"
                  {...register("author")}
                />

              </Col>
              <Col>
                <Form.Select
                  aria-label="BahasaPemrograman"
                  {...register("bahasa_pemrograman")}
                >
                  <option value="">Bahasa Pemrograman</option>
                  {bahasaPemrograman.map((bahasa) => (
                    <option key={bahasa.id} value={bahasa.name}>
                      {bahasa.name}
                    </option>
                  ))}
                </Form.Select>

              </Col>
            </Row>

            <Form.Group controlId="thumbnail" className="mb-3 my-2">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type="file"
                {...register("thumbnail")}
              />

            </Form.Group>

            <Form.Group controlId="content" className="mb-3 my-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                {...register("content")}
              />

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
