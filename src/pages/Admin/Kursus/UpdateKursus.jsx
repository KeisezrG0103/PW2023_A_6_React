import Card from "react-bootstrap/Card";
import { bahasaPemrograman } from "../../../constant/BahasaPemrograman";
import { Form, Row, Col, Button } from "react-bootstrap";
import {
  useGetKursusByIdQuery,
  useUpdateKursusMutation,
} from "../../../api/kursusApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateUpdateKursus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const [mutate, { isLoading }] = useUpdateKursusMutation();
  const id = useParams().id;
  console.log(id);
  const {
    data,
    isLoading: isLoadingGetKursusById,
    refetch,
  } = useGetKursusByIdQuery(id);

  useEffect(() => {
    refetch();
    if (data?.kursus) {
      setValue("title", data.kursus.title);
      setValue("author", data.kursus.author);
      setValue("bahasa_pemrograman", data.kursus.bahasa_pemrograman);
      setValue("content", data.kursus.content);
    }
  }, [data, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("bahasa_pemrograman", data.bahasa_pemrograman);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("_method", "PUT");

    try {
      mutate({ id, data: formData });

      console.log(data);
      toast.success("Kursus berhasil diupdate");
      navigate("/admin/kursus");
    } catch (error) {
      console.log(error);
      toast.error("Kursus gagal diupdate");
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <strong>Create Kursus</strong>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Title" {...register("title")} />
              </Col>
              <Col>
                <Form.Control placeholder="Author" {...register("author")} />
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
              <Form.Control type="file" {...register("thumbnail")} />
            </Form.Group>

            <Form.Group controlId="content" className="mb-3 my-2">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={10} {...register("content")} />
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
