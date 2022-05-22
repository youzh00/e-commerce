import React from "react";
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const CheckOutSteps = (step1,step2,step3,step4) => {
  return (
    <Nav className="justify-content-center mb-4">
        {/* Step 1 : sign in*/}
      <Nav.Item >
          {step1 ? (
            <LinkContainer to="/login">
                <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Sign In </Nav.Link> }
      </Nav.Item>
  {/* Step 2 : shipping*/}
      <Nav.Item >
          {step2 ? (
            <LinkContainer to="/payement">
                <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Shipping</Nav.Link> }
      </Nav.Item>
  {/* Step 3: Payement */}
      <Nav.Item >
          {step3 ? (
            <LinkContainer to="/login">
                <Nav.Link>Payement</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Payement</Nav.Link> }
      </Nav.Item>
  {/* Step 4: Place Order*/}
      <Nav.Item >
          {step4 ? (
            <LinkContainer to="/placeorder">
                <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ):<Nav.Link disabled>Place Order</Nav.Link> }
      </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps
