import React from 'react'
import { Navigate } from 'react-router-dom'
import Auth from './utils/auth'


function PrivateRoute({children}) {
  const auth = Auth.getToken();
  return auth ? children : <Navigate to='/login' />
  };



export default PrivateRoute
