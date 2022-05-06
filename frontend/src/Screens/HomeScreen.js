import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../actions/productActions";

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
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error.message}</h1>
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
