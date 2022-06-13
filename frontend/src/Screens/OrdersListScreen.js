import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { ordersListAdmin } from "../actions/orderActions";
import PageTitle from "../components/PageTitle";

//!-------------Component Part-------------//

const OrdersListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderslist = useSelector((state) => state.ordersList);
  const { loading, error, orders } = orderslist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(ordersListAdmin());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <PageTitle title={"Liste des commandes"} />

      <h1>Commandes</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>UTILISATEURS</th>
              <th>DATE</th>
              <th>PRIX TOTAL</th>
              <th>PAYÉ</th>
              <th>LIVRÉ</th>
              <th>PAYÉ À</th>
              <th>LIVRÉ À</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} Dhs</td>
                <td>{order.isPaid ? " Oui" : " Non"}</td>
                <td>{order.isDelivered ? " Oui" : " Non"}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}>
                      {" "}
                    </i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}>
                      {" "}
                    </i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Détails
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
