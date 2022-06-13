import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import PageTitle from "../components/PageTitle";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();
  const redirect = Boolean(searchParams.get("redirect"))
    ? searchParams.get("redirect")
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(`../${redirect}`);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <PageTitle title={"Connexion "} />
      <FormContainer>
        <h1>Se Connecter</h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label> Adresse Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Mot De Passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot De Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Se Connecter
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Nouveau client?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              S'inscrire
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
