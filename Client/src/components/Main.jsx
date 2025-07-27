import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import './App.css';
import Dashboard from '../Pages/Dashboard';

const Main = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    };

    return (
        <div className="app-container">
            <Navbar onToggleSidebar={toggleSidebar} />
            <Sidebar expanded={sidebarExpanded} />
            <Dashboard expanded={sidebarExpanded} />
        </div>
    );
};

export default Main;
