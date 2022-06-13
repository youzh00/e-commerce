//!-------------Requirements-------------//

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../actions/productActions";
import Spinner from "../components/Spinner";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import Paging from "../components/Paging";
import { ProductCarousel } from "../components/ProductCarousel";

//!-------------Component Part-------------//
export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pages, page } = useSelector(
    (state) => state.products
  );
  const { keyword, pageNumber = 1 } = useParams();

  useEffect(() => {
    dispatch(productsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (loading) {
    return (
      <>
        <PageTitle title={"Bienvenue à INPT-SHOP "} />
        <h1> Derniers produits </h1>
        <Spinner />
      </>
    );
  }
  if (error) {
    return (
      <>
        <PageTitle title={"Bienvenue à INPT-SHOP "} />
        <h1> Derniers produits </h1>
        <Message variant="danger">{error}</Message>;
      </>
    );
  }

  return (
    <>
      <PageTitle title={"Bienvenue à INPT-SHOP "} />
      {!keyword && <ProductCarousel />}
      <h1> Derniers produits </h1>

      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paging pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
  );
};
