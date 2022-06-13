//!-------------Requirements-------------//

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps.jsx";
import PageTitle from "../components/PageTitle";

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
      <PageTitle title={"Adresse de livraison"} />

      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Adresse de livraison</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Entrer Adresse"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* City input  */}

          <Form.Group controlId="city">
            <Form.Label>Ville</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Entrer Nom de Ville"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Postal code input  */}
          <Form.Group controlId="postalCode">
            <Form.Label>Code postal</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Entrer Code postal"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Country input  */}
          <Form.Group controlId="country">
            <Form.Label>Pays</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer Pays"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3 rounded">
            Continuer
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
