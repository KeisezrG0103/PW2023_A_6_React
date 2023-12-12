import React, { useEffect } from "react";
import {
  useGetWebinarQuery,
  useDeleteWebinarMutation,
} from "../../../api/webinarApi";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import TruncatedContent from "../../../component/TruncatedContent";
import { Table, Button } from "react-bootstrap";

const Index = () => {
  const { data, error, isLoading, refetch } = useGetWebinarQuery();
  const [mutate, { isLoading: isDeleting }] = useDeleteWebinarMutation();

  console.log(data?.webinar);
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return window.location.reload(false);
  }

  const deleteWebinar = async (id) => {
    try {
      await mutate(id);
      toast.success("Webinar Deleted Successfully", {
        duration: 3000,
      });
   
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end my-4">
        <Link to={`/admin/webinar/create`}>
          <Button variant="primary">Create</Button>
        </Link>
      </div>
      {data?.webinar.length === 0 ? (
        <h1>Belum ada data</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>thumbnail</th>
              <th>Title</th>
              <th>Pengisi Acara</th>
              <th>Tanggal</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.webinar.map((webinar, index) => (
              <tr key={webinar?.id}>
                <td>{index + 1}</td>
                {/* aspect ratio 1:3 */}
                <td>
                  <img
                    src={webinar?.thumbnail}
                    width="100px"
                    height="100px"
                    
                    
                    alt={`Thumbnail for ${webinar?.title}`}
                  />
                </td>
                <td>{webinar?.title}</td>
                <td>{webinar?.pengisi_acara}</td>
                <td>{webinar?.tanggal}</td>
                <TruncatedContent content={webinar?.content} maxLength={10} />
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteWebinar(webinar?.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/admin/webinar/${webinar?.id}`}>
                      <button className="btn btn-success">Edit</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Index;
