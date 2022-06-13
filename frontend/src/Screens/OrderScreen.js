import React, { useState, useEffect } from "react";
import { Row, ListGroup, Image, Card, Col, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/Spinner.jsx";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import PageTitle from "../components/PageTitle";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

//!-------------Component Part-------------//

export const OrderScreen = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(true);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  console.log(order);

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || successPay || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, successPay, order, successDeliver, navigate, userInfo]);

  const successPaymentHandler = async (data, action) => {
    const paymentResult = {};
    const details = await action.order.capture();

    paymentResult.status = "COMPLETED";
    paymentResult.email_address = details.payer.email_address;
    paymentResult.name =
      details.payer.name.given_name + details.payer.name.surname;

    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
    localStorage.removeItem("cartItems");
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <>
      <PageTitle title={"Commandes "} />
      <Spinner />
    </>
  ) : error ? (
    <>
      <PageTitle title={"Commandes "} />
      <Message variant="danger">{error}</Message>
    </>
  ) : (
    <>
      <PageTitle title={"Commandes "} />
      <h1>Command : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Adresse de livraison</h2>
              <p>
                <strong>Nom: </strong>
                {order.user.name}
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong> Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Livrés le {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Non livrés</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Méthode de payement</h2>
              <p>
                {" "}
                <strong>Méthode: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Payé le {order.paidAt.substring(0, 10)} -{" "}
                  {order.paidAt.substring(11, 16)}
                </Message>
              ) : (
                <Message variant="danger">Impayé</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Articles commandés</h2>
              {order.orderItems.length === 0 ? (
                <Message>Pas de Commandes</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} Dhs=
                          {Number(item.qty) * Number(item.price)} Dhs
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Récapitulatif de la commande</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Articles</Col>
                  <Col>{order.itemsPrice} Dhs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Frais de livraison</Col>
                  <Col>{order.shippingPrice} Dhs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Impôt</Col>
                  <Col>{order.taxPrice} Dhs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} Dhs</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Spinner />}
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "ARt9bm2mkL3ycW-vA2MqqWI2i49mLga46N0spTAu1DsmatEGkajDAIEw3cPaC0-A5XI20YAwy2WDWQeo",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={successPaymentHandler}
                      createOrder={(data, actions) => {
                        return actions.order
                          .create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: order.totalPrice,
                                },
                              },
                            ],
                          })
                          .then((orderId) => {
                            return orderId;
                          });
                      }}
                    />
                  </PayPalScriptProvider>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Spinner />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block rounded"
                      onClick={deliverHandler}
                    >
                      Marquer comme livré
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
