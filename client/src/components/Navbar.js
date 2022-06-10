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
      <Navbar className="flex flex-row px-6 h-fit" bg='black' variant='dark' expand='lg' style={{position:"fixed"}}>

        <Container>
          <div>
            <h1 className='text-orange-700 text-xl'>Hungry Sharks</h1>
          </div>
        </Container>

        <Container className="flex flex-row items-center justify-end" fluid>
          <Navbar.Brand 
          className="bg-[#040417] hover:bg-orange-700 text-white font-bold py-2  px-10"
          as={Link} to='/'>
            Home
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse  id='navbar'>
            <Nav className='flex flex-row items-center  ml-auto'>
            <Nav.Link
            className="bg-[#040417] hover:bg-orange-700 text-white font-bold py-2  px-10"
            as={Link} to='/rules'>
                Rules
              </Nav.Link>
              <br></br>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link 
                  className="bg-[#040417] hover:bg-orange-700 text-white font-bold py-2  px-10"
                  as={Link} to='/highscores'>
                    See HighScores
                  </Nav.Link>
                  <br></br>
                  <Nav.Link 
                  className="bg-[#040417] hover:bg-orange-700 text-white font-bold py-2  px-10"
                  onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link 
                className="bg-[#040417] hover:bg-orange-700 text-white font-bold py-2  px-10"
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
