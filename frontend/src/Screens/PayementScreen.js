//!-------------Requirements-------------//

import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePayementMethod } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps.jsx";
import PageTitle from "../components/PageTitle";

//!-------------Component Part-------------//
const PayementScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [payementMethod, setPayementMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayementMethod(payementMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <PageTitle title={"Mode de paiement"} />
      <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h1>Méthode de payement</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Sélectionnez la méthode</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPayementMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked
                onChange={(e) => setPayementMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3 rounded">
            Continuer
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PayementScreen;
