import React , {useEffect} from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useGetWebinarByIdQuery, useUpdateWebinarMutation } from "../../../api/webinarApi";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast"; 
import { useNavigate } from "react-router-dom";


const UpdateWebinar = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  
  const id = useParams().id;

  const { data, isLoading: isLoadingGetKursusById } = useGetWebinarByIdQuery(id);

  console.log(data?.webinar);


  useEffect(() => {
    if (data?.webinar) {
      setValue("title", data.webinar.title);
      setValue("pengisi_acara", data.webinar.pengisi_acara);
      setValue("tanggal", data.webinar.tanggal);
      setValue("content", data.webinar.content);
      setValue("thumbnail", data.webinar.thumbnail);
    }
  }, [data, setValue]);


  const [mutate, { isLoading }] = useUpdateWebinarMutation();


  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("pengisi_acara", data.pengisi_acara);
    formData.append("tanggal", data.tanggal);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("_method", "PUT");


    

    try {
      await mutate({id, data: formData});
      toast.success("Webinar berhasil diupdate");
      navigate("/admin/webinar");

    } catch (error) {
      console.log(error);
    }
  }

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
                  className={`${errors.title ? "is-invalid" : ""}`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title && errors.title.message}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Pengisi Acara"
                  {...register("pengisi_acara")}
                  className={`${errors.pengisi_acara ? "is-invalid" : ""}`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pengisi_acara && errors.pengisi_acara.message}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  placeholder="tanggal"
                  {...register("tanggal")}
                  className={`${errors.tanggal ? "is-invalid" : ""}`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tanggal && errors.tanggal.message}
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Form.Group controlId="thumbnail" className="mb-3 my-2">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type="file"
                {...register("thumbnail")}
                className={`${errors.thumbnail ? "is-invalid" : ""}`}
              />
              <Form.Control.Feedback type="invalid">
                {errors.thumbnail && errors.thumbnail.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="content" className="mb-3 my-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                {...register("content")}
                className={`${errors.content ? "is-invalid" : ""}`}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content && errors.content.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateWebinar;
