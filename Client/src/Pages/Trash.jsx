import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const Trash = () => {
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
      <div className='text-center mt-5 pt-5'>Trash</div>
    </>
  )
}

export default Trash