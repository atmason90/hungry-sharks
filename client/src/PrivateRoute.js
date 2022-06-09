import React from 'react'
import { Navigate, Route } from 'react-router-dom'


function PrivateRoute ({children}) {
  const [jwt, setJwt] = useLocalStorage('', 'jwt')
    return jwt ? children : <Navigate to='/login'/>
  };

export default PrivateRoute