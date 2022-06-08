import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container,} from 'react-bootstrap';
import Signup from './Signup';
import Login from './Login';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/rules'>
                View Rules
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/highscores'>
                    See Highscores
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout()}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(false)}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
     
    </>
  );
};

export default AppNavbar;
