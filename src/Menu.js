import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router';
import { ProductosContext } from "./ProductosContext.js"
import { useState, useContext, useEffect } from 'react';

function Menu() {


    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Productos</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/products">productos</Nav.Link>
                <Nav.Link as={Link} to="/about">Sobre nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
            </Nav>
        </Navbar>


    )
}

export default Menu;