import { Table, Spinner } from "react-bootstrap";
import { useGetUserQuery, useDeleteUserMutation } from "../../api/userApi";
import { toast } from "react-hot-toast";

const AllUser = () => {
  const { data, error, isLoading } = useGetUserQuery();
  const [mutate, { isLoading: isDeleting }] = useDeleteUserMutation();

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error) return <h1>Error loading users. Please try again later.</h1>;

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
    </>
  );
};

export default AllUser;