import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Layout from './Pages/Layout'
import Login from './components/Login'
import Dashboard from './Pages/Dashboard'
import User_profile from './User_profile'
import Remainder from './Pages/Remainder'
import Label from './Pages/Label'
import Archive from './Pages/Archive'
import Trash from './Pages/Trash'
import Main from './components/Main'
import Success from './components/Success'
import Protected from './components/Protected'

function App() {
  const [count, setCount] = useState(0)
  // const token = localStorage.token
  // const token = localStorage.getItem("token")
  // console.log(token);
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/success' element={<Success/>}/>
        {/* <Route path='/dashboard/:id' element={<User_profile/>}/> */}
        <Route path='/dashboard/:userId' element={<Protected><Dashboard/></Protected>} />
        <Route path='/dashboard/:userId/remainder' element={<Remainder/>} />
        <Route path='/dashboard/:userId/label' element={<Label/>} />
        <Route path='/dashboard/:userId/achieve' element={<Archive/>} />
        <Route path='/dashboard/:userId/trash' element={<Trash/>} />
        <Route path='/main' element={<Main/>} />
      </Routes>
    </>
  )
}

export default App
