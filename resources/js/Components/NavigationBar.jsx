import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react'; 
import '/resources/css/underline.css'; 

export default function NavigationBar({name=null}) {
  
  let pathname = window.location.pathname.replace(/^\//, '') || 'home';
  if(name){pathname=name}
  const linkStyle = (linkName) => {
    const isActive = linkName === pathname;
    return isActive ? { color: '#4C6665' } : { color: '#00192F' };
  };

  const underlineHalf = (text, linkName) => {
    const isActive = linkName === pathname;
    const halfIndex = Math.ceil(text.length / 2);
    return (
      <span>
        {isActive ? (
          <>
            <span className="underline-half-left">{text.slice(0, halfIndex)}</span>
            <span>{text.slice(halfIndex)}</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </span>
    );
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-custom"
      style={{ fontSize: '14px', backgroundColor: "#9AB5AE", width: '100%', zIndex: 1000 , paddingInline:"2vw"}}
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          <img
            src="/assets/logo.png"
            width="45"
            height="62.5"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" className="navigation" style={linkStyle('home')}>{underlineHalf('HOME', 'home')}</Nav.Link>
            <Nav.Link as={Link} href="/store" className="navigation" style={linkStyle('store')}>{underlineHalf('STORE', 'store')}</Nav.Link>
            <Nav.Link as={Link} href="/cart" className="navigation" style={linkStyle('cart')}>{underlineHalf('MY CART', 'cart')}</Nav.Link>
            <Nav.Link as={Link} href="/contact" className="navigation" style={linkStyle('contact')}>{underlineHalf('CONTACT', 'contact')}</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
