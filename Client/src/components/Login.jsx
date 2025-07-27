import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import "./Auth.css"

const Login = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null);

  const location = useLocation();
  let navigate = useNavigate()
  const url = 'http://localhost:7000/login'

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: (values) => {
      console.log(values);
      axios.post(url, values)
      .then((response) => {
        console.log(response);
        if(response.data.status === true){
          console.log("user found");
          const id = response.data.user._id;
          const userDetails = response.data.user
          
          console.log(id);
          localStorage.setItem("users", JSON.stringify(userDetails))
          localStorage.token = response.data.token
          console.log(response.data.token);
          
          navigate(`/dashboard/${id}`)
          
          
        }else{
          setMessage(response.data.message)
          console.log('user not found');
           
        }
        
      }).catch((err) => {
        console.log(err);
        
      })
      
    }
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMsg = params.get("error");
    if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
    }
  }, [location]);
  // console.log(formik.values);
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:7000/auth/google/login'
  }
  return (
    <>
      <section className='bg-color vh-100 container-fluid'>
        <div action="" onSubmit={formik.handleSubmit} className='row bg text-center col-xl-7 col-xxl-7 col-lg-7 col-md-8 col-11 rounded-5 mx-auto py-5 shadow'>
        <h1 className=''>Welcome Back</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
          <form className='col-11 mx-auto col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
            <input  
              type="email"
              name='email' 
              placeholder='enter you email'
              className='form-control shadow-none mt-3' 
              onChange={formik.handleChange}
            />
            <input 
              type="password"
              name='password' 
              placeholder='enter your password' 
              className='form-control shadow-none mt-3'
              onChange={formik.handleChange}
            />
            <small className='text-danger'>{message}</small>
            <button type='submit' className='btn btn-primary rounded-pill w-100 my-3'>Login</button>
          </form>
          <div className='col-11 col-md-6 col-lg-6 col-xl-6 col-xxl-6 py-2'>
             <div className='d-flex gap-2'>
                <hr style={{width:"100%",}}/>
                <p>or</p>
                <hr style={{width:"100%"}}/>
             </div>
              <button className='btn border border-black w-100 mb-4' onClick={handleGoogleLogin}><img src="/images/Google.png" alt="" width={'30px'}/>Login with google</button>
              <button className='btn border border-black w-100'><i class="fa-brands fa-facebook"></i>&nbsp; Login with facebook</button>
            <p className='text center'>Don't have account with us <a href="/signup">Register</a></p>
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Login