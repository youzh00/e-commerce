import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../actions/productActions";
import Spinner from "../components/Spinner";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  console.log(productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);
  // const products = [];
  return (
    <>
      <h1> Latest Products </h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
