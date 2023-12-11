import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useGetKursusQuery,
  useDeleteKursusMutation,
} from "../../../api/kursusApi";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useState } from "react";
import TruncatedContent from "../../../component/TruncatedContent";

const Index = () => {
  const { data, error, isLoading, refetch } = useGetKursusQuery();
  const [mutate, { isLoading: isDeleting }] = useDeleteKursusMutation();

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
    return <h1>Error fetching kursus</h1>;
  }

  const deleteKursus = async (id) => {
    try {
      await mutate(id);
      toast.success("Kursus Deleted Successfully", {
        duration: 3000,
      });
      // Refetch the kursus data after deletion
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end my-4">
        <Link to={`/admin/kursus/create`}>
          <Button variant="primary">Create</Button>
        </Link>
      </div>
      {data?.kursus.length === 0 ? (
        <h1>Belum ada data</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>thumbnail</th>
              <th>Title</th>
              <th>Pemrograman</th>
              <th>Content</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.kursus.map((kursus, index) => (
              <tr key={kursus.id}>
                <td>{index + 1}</td>
                {/* aspect ratio 1:3 */}
                <td>
                  <img
                    src={kursus.thumbnail}
                    width="100px"
                    height="100px"
                    alt={`Thumbnail for ${kursus.title}`}
                  />
                </td>
                <td>{kursus.title}</td>
                <td>{kursus.bahasa_pemrograman}</td>
                <TruncatedContent content={kursus.content} maxLength={10} />
                <td>{kursus.author}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteKursus(kursus.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/admin/kursus/${kursus.id}`}>
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
