import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const Remainder = () => {
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
      <div className='text-center pt-5 mt-5'>Remainder</div>
    </>
  )
}

export default Remainder