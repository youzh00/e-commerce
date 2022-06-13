import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Paging from "../components/Paging";
import {
  productsList,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import PageTitle from "../components/PageTitle";

//!-------------Component-------------//

const ProductsListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();

  const productslist = useSelector((state) => state.products);
  const { loading, error, products, pages, page } = productslist;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(productsList("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      //   Delete product section
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    // Create product section
    dispatch(createProduct());
  };
  return (
    <>
      <PageTitle title={"Liste de produits"} />

      <Row className="align-items-center">
        <Col>
          <h1>Produits</h1>
        </Col>
        <Col>
          <Button className="my-3 rounded" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Créer un produit
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOM DU PRODUIT</th>
                <th>PRIX</th>
                <th>CATÉGORIE</th>
                <th>MARQUE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} Dhs</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm rounded">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm rounded"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paging pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductsListScreen;
