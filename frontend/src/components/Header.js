import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import style from "../Styles/Header.module.css";

const Header = () => {
  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        collapseOnSelect
        className={style.navbar}
      >
        <Container>
          <Navbar.Brand href="/">INPT-SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <Nav.Link href="/cart" className={style.cart}>
                <i className="fas fa-shopping-cart"></i>
                Cart
              </Nav.Link>
              <Nav.Link href="/login" className={style.login}>
                <i className="fas fa-user"></i>Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
