import React from 'react'
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to={"/login"}/>
  return (
    <div></div>
  )
}

export default Protected