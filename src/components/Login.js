import React, { useState } from 'react'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
      return username.length > 0 && password.length > 0;
  }

  const handleFormSubmit = (event) => {
      event.preventDefault();
  }
    
  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
          <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type='String'
                value='username'
                onChange={(e) => setUsername(e.target.value)}
              />  
          </Form.Group>
          <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value='password'
                onChange={(e) => setPassword(e.target.value)}
              />
          </Form.Group>
          <Button type='submit' disabled={!validateForm}>Login</Button>
      </Form>
    </div>
  )
}

export default Login
