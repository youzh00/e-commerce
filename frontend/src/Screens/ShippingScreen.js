//!-------------Requirements-------------//

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { set } from "mongoose";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps.jsx";

//!-------------Component Part-------------//
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("shipping page submit");
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* City input  */}

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Postal code input  */}
          <Form.Group controlId="postalCode">
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postalCode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Country input  */}
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
