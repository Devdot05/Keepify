import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const Label = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const toggleSidebar = () => {
      setSidebarExpanded(!sidebarExpanded);
    };
  return (
    <>
    <div className="navbar">
      <Navbar onToggleSidebar={toggleSidebar} />
    </div>
    <Sidebar expanded={sidebarExpanded} />
    <div className='text-center pt-5 mt-5'>Label</div>
      {/* <img src="https://res.cloudinary.com/dlkytw4he/image/upload/v1750016177/nlann561o8qstmou8rlv.jpg" alt="" /> */}
    
    </>
  )
}

export default Label