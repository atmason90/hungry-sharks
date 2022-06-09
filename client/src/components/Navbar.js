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
      <Navbar className="flex-row items-center justify-between px-6" bg='black' variant='dark' expand='lg'>
        <Container className="flex flex-row items-center " fluid>
          <Navbar.Brand 
          className="flex-row items-center bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
          as={Link} to='/'>
            Home
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse  id='navbar'>
            <Nav className='flex flex-row items-center  ml-auto'>
            <Nav.Link
            className="flex-row items-center bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
            as={Link} to='/rules'>
                See Game Rules
              </Nav.Link>
              <br></br>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link 
                  className="flex-row items-center bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
                  as={Link} to='/highscores'>
                    See HighScores
                  </Nav.Link>
                  <br></br>
                  <Nav.Link 
                  className="flex-row items-center bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
                  onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link 
                className="flex-row items-center bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
                as={Link} to='/login'>Login</Nav.Link>
              )
            //   (<Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>)
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
     
    </>
  );
};

export default AppNavbar;
