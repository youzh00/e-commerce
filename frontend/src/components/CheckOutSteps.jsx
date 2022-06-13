import React from "react";
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const CheckOutSteps = ({step1,step2,step3,step4}) => {
 
  return (
    <Nav className="justify-content-center mb-4">
        {/* Step 1 : sign in*/}
      <Nav.Item >
          {step1 ? (
            <LinkContainer to="/login">
                <Nav.Link>S'identifier</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>S'identifier </Nav.Link> }
      </Nav.Item>
  {/* Step 2 : shipping*/}
      <Nav.Item >
          {step2 ? (
            <LinkContainer to="/shipping">
                <Nav.Link>Adresse de livraison</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Adresse de livraison</Nav.Link> }
      </Nav.Item>
  {/* Step 3: Payment */}
      <Nav.Item >
          {step3 ? (
            <LinkContainer to="/payment">
                <Nav.Link>Payement</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Payement</Nav.Link> }
      </Nav.Item>
  {/* Step 4: Place Order*/}
      <Nav.Item >
          {step4 ? (
            <LinkContainer to="/placeorder">
                <Nav.Link>Passer la commande</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Passer la commande</Nav.Link> }
      </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps
