import { Table, Spinner, Pagination } from "react-bootstrap";
import { useGetUserQuery, useDeleteUserMutation } from "../../api/userApi";
import { toast } from "react-hot-toast";
import { useState } from "react";

const AllUser = () => {
  const { data, error, isLoading, isUninitialized } = useGetUserQuery();
  const [mutate, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(5);

  const nPage = Math.ceil(data?.users.length / userPerPage);
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  const currentUser = data?.users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error) return window.location.reload(false);

  if (isUninitialized) return null;

  // if(isUninitialized) return null;
  const DeleteUser = async (id) => {
    try {
      await mutate(id);
      toast.success("User Deleted Successfully", {
        duration: 3000, // 3 seconds
      });
      window.location.reload(false);
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Education</th>
            <th>Coding Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.education}</td>
              <td>{user.coding_experience}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => DeleteUser(user.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: nPage }, (_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === nPage}
          />
        </Pagination>
      </div>
    </>
  );
};

export default AllUser;
