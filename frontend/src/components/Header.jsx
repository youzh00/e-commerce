import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import style from "../Styles/Header.module.css";
import {LinkContainer} from "react-router-bootstrap"
import { Link } from "react-router-dom";
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
          <a href="/">
            <Navbar.Brand >INPT-SHOP</Navbar.Brand>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                  <Nav.Link  className={style.cart}>
                    <i className="fas fa-shopping-cart"></i>
                    Cart
                  </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                  <Nav.Link  className={style.login}>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
              </LinkContainer>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
