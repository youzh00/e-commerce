//!----------------Requirement--------------------//
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productActions";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

//!------------------Component Part--------------------//
export const ProductScreen = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const listProductDetails = useSelector((state) => state.product);
  const { loading, error, product } = listProductDetails;
  useEffect(() => {
    dispatch(productDetails(id));
  }, [id, dispatch]);
  console.log(product.countInStock);
  console.log(`qty: ${qty}`);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      <a className="btn btn-dark my-3 rounded" href="/">
        Go Back
      </a>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price} $</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-black"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
