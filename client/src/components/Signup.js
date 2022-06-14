import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';
import Navbar from "./Navbar"

const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    
    <div className='signup h-screen'>
    <Navbar/>
    <br></br>
    <br></br>

    <div className='flex justify-center items-center mt-20'>
    <Container className='border border-orange-600 w-fit flex flex-col justify-center items-center rounded px-8 py-8 h-fit' >
      {/* This is needed for the validation functionality above */}
      <Form 
      className='flex flex-col items-center justify-center'
      noValidate 
      validated={validated} 
      onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert onClose={() => setShowAlert(false)} show={showAlert} variant='danger' className='fixed w-auto top-16 bg-red-900 py-2 px-5'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username' className='text-orange-600'>Username</Form.Label>
          <Form.Control
            className="text-slate-1000 mx-1 w-30 bg-slate-800 pl-2"
            type='text'
            placeholder='Username...'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label htmlFor='email' className='text-orange-600'>Email</Form.Label>
          <Form.Control
            className="text-slate-1000 mx-1 w-30 bg-slate-800 pl-2"
            type='email'
            placeholder='Email...'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label htmlFor='password' className='text-orange-600'>Password</Form.Label>
          <Form.Control
            className="text-slate-1000 mx-1 w-30 bg-slate-800 pl-2"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>
        <br></br>

        <Button
        //   disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          className="bg-[#000000] hover:bg-orange-700 hover:border-black text-white font-bold py-2 px-4 border border-[#f06c00] rounded"
          type='submit'
          variant='success'>
          Submit
        </Button>

      </Form>
      </Container>
      </div>
    </div>
  );
};

export default Signup;