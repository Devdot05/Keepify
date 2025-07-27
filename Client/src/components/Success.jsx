import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  const location = useLocation();

  let user = JSON.parse(localStorage.getItem('users'))
  console.log(user);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log(token );
    if (token) {
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      console.log(userId);
      

      navigate(`/dashboard/${userId}`);
    } else {
      navigate("/login");
    }
  }, [navigate, location]);

  return <div>Logging you in...</div>;
}

export default Success;
