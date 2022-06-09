import React, {useState} from 'react'
import { Link } from 'react-router-dom';
// import { Grid,Paper, TextField, Button, Typography,Link } from '@material-ui/core'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { FormControl, FormGroup } from '@material-ui/core';
// import Checkbox from '@material-ui/core/Checkbox';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../utils/API';
import Auth from '../utils/auth'
import Signup from './Signup';

const Login=()=> {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const response = await loginUser(userFormData);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const { token, user } = await response.json();
        console.log(user);
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

    const paperStyle={padding :20,height:'100vh',width:280, margin:"20px auto"}
    // const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}


    return(
      <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            className="text-slate-1000 mx-1 w-30 bg-slate-800"
            type='text'
            placeholder='Email...'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Group>
<br></br>
        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            className="text-slate-1000 mx-1 w-30 bg-slate-800"
            type='password'
            placeholder='Password...'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group>

          Don't have an account ?
          <Link 
          className="bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
          as={Link} to='/signup' > Sign Up! </Link>

        </Form.Group>
        <br></br>
        <Button 
          className="bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10"
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
    )
}

export default Login




// import React, { useState } from 'react'
// import {
//     Checkbox,
//     Grid,
//     TextField,
//     FormControlLabel,
//     Paper,
//     Button
//   } from '@material-ui/core';


// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const validateForm = () => {
//       return username.length > 0 && password.length > 0;
//   }

//   const handleFormSubmit = (event) => {
//       event.preventDefault();
//   }
    
//   return (
//     <div style={{ padding: 30 }}>
//         <Paper>
//         <Grid
//           container
//           spacing={3}
//           direction={'column'}
//           justify={'center'}
//           alignItems={'center'}
//         >
//           <Form onSubmit={handleFormSubmit}>
//             <Grid item xs={12}>
//                 <TextField onChange={(e) => setUsername(e.target.value)} label="Username"></TextField>
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type={'password'}></TextField>
//             </Grid>
//             <Grid item xs={12}>
//                 <Button type='submit' fullWidth> Login </Button>
//             </Grid>
//           </Form>
//         </Grid>
//       </Paper>
//       {/* <Form onSubmit={handleFormSubmit}>
//           <Form.Group>
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 autoFocus
//                 type='String'
//                 value='username'
//                 onChange={(e) => setUsername(e.target.value)}
//               />  
//           </Form.Group>
//           <Form.Group>
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type='password'
//                 value='password'
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//           </Form.Group>
//           <Button type='submit' disabled={!validateForm}>Login</Button>
//       </Form> */}
//     </div>
//   )
// }

// e
