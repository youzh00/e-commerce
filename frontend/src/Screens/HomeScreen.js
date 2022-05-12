//!-------------Requirements-------------//

import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../actions/productActions";
import Spinner from "../components/Spinner";

//!-------------Component Part-------------//
export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <h1> Latest Products </h1>
        <Spinner />
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1> Latest Products </h1>
        <Message variant="danger">{error}</Message>;
      </>
    );
  }

  return (
    <>
      <h1> Latest Products </h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
