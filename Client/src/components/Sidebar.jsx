import React, { useState } from 'react';
import '../Css/Sidebar.css';
import Navbar from './Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({expanded}) => {
    const [userName, setUserName] = useState({})
    const jwt_url = "https://keepify-1.onrender.com/protected"
    useEffect(()=>{
        jwtProtected()
        console.log(userName);
        
    }, [])
    const navigate = useNavigate()

    const token= localStorage.token
    // console.log(token);
    
    

    const jwtProtected = () => {
    axios.get(jwt_url, {
      headers : {
        "Authorization": `Bearer ${token}`,
        "Content-Type" : "application/json",
        "Accept" : 'application/json'
      }
    })
    .then((response)=>{
      console.log(response);
      const user = response.data.user
    //   console.log(user);
      
      setUserName(user)
      console.log(userName);
      
      if(!response.data.status){
        navigate('/login')
      }
    }) .catch((err)=>{
        console.log(err);
        
    })

  }

   

    return (
        <>
            {userName._id && (
                <>
                
                    <div className={`sidebar d-flex flex-column p-2 ${expanded ? 'expanded' : ''}`}>
                        {/* <button className="toggle-btn" onClick={toggleSidebar}>
                            <i class="fa-solid fa-bars"></i>
                        </button> */}
                        <a href={`/dashboard/${userName._id}`} className="nav-link">
                            <i className="fa-solid fa-lightbulb text-success"></i>
                            <span className="ms-2">Notes</span>
                        </a>
                        <a href={`/dashboard/${userName._id}/remainder`} className="nav-link">
                            <i className="fa-solid fa-bell text-success"></i>
                            <span className="ms-2">Reminders</span>
                        </a>
                        <a href={`/dashboard/${userName._id}/label`} className="nav-link">
                            <i className="fa-solid fa-pencil text-success"></i>
                            <span className="ms-2">Edit Labels</span>
                        </a>
                        <a href={`/dashboard/${userName._id}/achieve`} className="nav-link">
                            <i className="fa-solid fa-box-archive text-success"></i>
                            <span className="ms-2">Archive</span>
                        </a>
                        <a href={`/dashboard/${userName._id}/trash`} className="nav-link">
                            <i className="fa-solid fa-trash text-success" ></i>
                            <span className="ms-2">Trash</span>
                        </a>
                    </div>
                </>
            )}
        </>
    );
};

export default Sidebar;
