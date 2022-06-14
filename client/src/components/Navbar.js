import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container,} from 'react-bootstrap';
import Signup from './Signup';
import Login from './Login';

import Auth from '../utils/auth';

const AppNavbar = () => {

  return (
      <Navbar className="flex flex-row px-6 h-fit items-end justify-end z-10"  variant='dark' expand='lg' style={{position:"fixed"}}>


        <Container className="flex flex-row items-center justify-end" fluid>
          <Navbar.Brand 
          className="hover:bg-orange-700 text-white text-2xl py-2  px-10"
          style={{textShadow: "rgba(255, 68, 0, 0.918) 0 10px 20px"}}
          as={Link} to='/'>
            Home
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse  id='navbar'>
            <Nav className='flex flex-row items-center  ml-auto'>
            <Nav.Link
            className="hover:bg-orange-700 text-white text-2xl py-2  px-10"
            style={{textShadow: "rgba(255, 68, 0, 0.918) 0 10px 20px"}}
            as={Link} to='/rules'>
                Rules
              </Nav.Link>
              <br></br>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link 
                  className="hover:bg-orange-700 text-white text-2xl py-2  px-10"
                  style={{textShadow: "rgba(255, 68, 0, 0.918) 0 10px 20px"}}
                  as={Link} to='/highscores'>
                    HighScores
                  </Nav.Link>
                  <br></br>
                  <Nav.Link 
                  className="hover:bg-orange-700 text-white text-2xl py-2  px-10"
                  style={{textShadow: "rgba(255, 68, 0, 0.918) 0 10px 20px"}}
                  onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link 
                className="hover:bg-orange-700 text-white text-2xl py-2  px-10"
                style={{textShadow: "rgba(255, 68, 0, 0.918) 0 10px 20px"}}
                as={Link} to='/login'>Login</Nav.Link>
              )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
  );
};

export default AppNavbar;
