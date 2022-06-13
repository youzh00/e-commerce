import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import FormContainer from "../components/FormContainer";
import { productDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import PageTitle from "../components/PageTitle";

//!-------------Component Part-------------/

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productdetails = useSelector((state) => state.product);
  const { loading, error, product } = productdetails;

  const productupdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = productupdate;

  useEffect(() => {
    if (successUpdated) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate(`/admin/productslist`);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [product, productId, dispatch, navigate, successUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update product section
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    setUploading(true);
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const { data } = await axios.post("/upload", formData, config);
      setImage(data);
      console.log(data);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <PageTitle title={"Modification du produit"} />

      <Link to="/admin/productslist" className="btn btn-light my-3">
        Retourner
      </Link>
      <FormContainer>
        <h1>Modifier le produit</h1>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="name"
                placeholder="Entrer Nom du produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="price"
                placeholder=" Entrer Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              ></Form.Control>
              <Form.Group>
                <Form.Control
                  type="file"
                  id="image-file"
                  label="Choisir le fichier"
                  onChange={uploadFileHandler}
                />
              </Form.Group>
              {uploading && <Spinner />}
            </Form.Group>

            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="brand"
                placeholder="Entrer Marque "
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label> Stock</Form.Label>
              <Form.Control
                type="countInStock"
                placeholder="Entrer le nombre "
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="category"
                placeholder="Entrer Catégorie "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Entrer Description "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3 rounded">
              Mise à jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
