import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark"  expand="lg" >
      <Navbar.Brand  as={Link} to="/" className ="m-2">Sistema de despesas</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="nav-link" as={Link} to="/despesas">Despesas</Nav.Link>
          <Nav.Link className="nav-link" as={Link} to="/obras">Obras</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default header;

