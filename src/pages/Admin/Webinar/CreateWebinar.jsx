import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";

import { useCreateWebinarMutation } from "../../../api/webinarApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CreateWebinar = () => {


  const [mutate, { isLoading, isError }] = useCreateWebinarMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("pengisi_acara", data.pengisi_acara);
    formData.append("tanggal", data.tanggal);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("content", data.content);



    try {
      await mutate(formData).unwrap();
      toast.success("Webinar Created Successfully", {
        duration: 3000,
      });

      navigate("/admin/webinar");

      
    } catch (error) {
      console.log(isError);
      console.log(error.data.errors.title);

      if(error.data.errors.title){
        setError("title", {
          type: "manual",
          message: error.data.errors.title,
        });
      }

      if(error.data.errors.pengisi_acara){
        setError("pengisi_acara", {
          type: "manual",
          message: error.data.errors.pengisi_acara,
        });
      }

      if(error.data.errors.tanggal){
        setError("tanggal", {
          type: "manual",
          message: error.data.errors.tanggal,
        });
      }

      if(error.data.errors.thumbnail){
        setError("thumbnail", {
          type: "manual",
          message: error.data.errors.thumbnail,
        });
      }

      if(error.data.errors.content){
        setError("content", {
          type: "manual",
          message: error.data.errors.content,
        });
      }


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
                <Form.Control placeholder="Title" {...register("title")} className={`${errors.title ? "is-invalid" : ""}`} />
                <Form.Control.Feedback type="invalid">
                  {errors.title && errors.title.message}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control placeholder="Pengisi Acara" {...register("pengisi_acara")} className={`${errors.pengisi_acara ? "is-invalid" : ""}`} />
                <Form.Control.Feedback type="invalid">
                  {errors.pengisi_acara && errors.pengisi_acara.message}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control type="date" placeholder="Tanggal" {...register("tanggal")} className={`${errors.tanggal ? "is-invalid" : ""}`} />
                <Form.Control.Feedback type="invalid">
                  {errors.tanggal && errors.tanggal.message}
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Form.Group controlId="thumbnail" className="mb-3 my-2">
              <Form.Label >Thumbnail</Form.Label>
              <Form.Control type="file" {...register("thumbnail")}  className={`${errors.thumbnail ? "is-invalid" : ""}`} />
              <Form.Control.Feedback type="invalid">
                {errors.thumbnail && errors.thumbnail.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="content" className="mb-3 my-2">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={10} {...register("content")} className={`${errors.content ? "is-invalid" : ""}`} />
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

export default CreateWebinar;