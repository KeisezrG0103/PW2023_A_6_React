import { bahasaPemrograman } from "../../constant/BahasaPemrograman";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useGetKursusByBahasaQuery } from "../../api/kursusApi";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const User_Category = () => {
  const param = useParams();
  const category = param.kategori;

  const { data, error, isLoading, refetch } =
    useGetKursusByBahasaQuery(category);

  const [id_pembelian, setId_pembelian] = useState(0);

  console.log(id_pembelian);
  const selector = useSelector((state) => state.auth.user);

  useEffect(() => {
    setId_pembelian(selector.id_pembelian);
  }, [selector]);

  console.log(data);

  const find = bahasaPemrograman.filter((item) => item.name === category);

  console.log(find);

  return (
    <Container fluid className="mt-5 pt-5">
      <Card>
        <Card.Body>
          <Card.Title>{category}</Card.Title>
          <Card.Text>{find[0].Description}</Card.Text>
        </Card.Body>
      </Card>

      <div className="d-flex flex-wrap justify-content-start my-2">
        <h5>List of Course</h5>

        {isLoading ? (
          <div className="d-flex justify-content-center mt-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : null}

        <div className="my-2 w-100">
          {data?.kursus.map((item, index) => (
            <Card key={index} className="" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Img
                  variant="top"
                  src={item.thumbnail}
                  style={{ width: "100%", height: "200px" }}
                />
              </Card.Body>
              <Card.Footer className="text-end">
                <button
                  className="btn btn-primary"
                  {...(id_pembelian == 0 || id_pembelian == null ? { disabled: true } : null)}
                >
                  <Link to={`/user/${category}/${item.id}`} className="text-white">
                  Pelajari
                  </Link>
                </button>
              </Card.Footer>
            </Card>
          ))}
        </div>

        {data?.kursus.length === 0 ? <h3>Belum ada data</h3> : null}
      </div>
    </Container>
  );
};

export default User_Category;
