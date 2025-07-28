import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import * as yup from 'yup'
import "./Auth.css"
import { use } from 'react';
import { useEffect } from 'react';


const Signup = () => {
  const url = "https://keepify-1.onrender.com/register"
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null);
  
  const location = useLocation();
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    
    onSubmit: (values) => {
      console.log(values);
      axios.post(url, values)
      .then((response)=>{
        console.log(response);
        if(response.data.status) {
          navigate('/login')
        }else{
          setMessage(response.data.message)
          
        }
        
      }).catch((err)=>{
        console.log(err);
        
      })
      
    },

    validationSchema: yup.object({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      email: yup.string().email('invalid email format').required('email is required'),
      password: yup.string().required('password is required').min(6, "most not be less than 6 characters")
    })

    
  })
  console.log(formik.errors);


  const handleGoogleSignup = () => {
    window.location.href = 'https://keepify-1.onrender.com/auth/google/signup'
  }

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMsg = params.get("error");
    if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
    }
  }, [location]);

  
  return (
    <>
      <section className='container-fluid bg-color'>
        <div className='row bg col-xxl-8 col-xl-8 col-md-10 col-11 rounded-5 mx-auto py-5 shadow'>
          <form onSubmit={formik.handleSubmit} className=' col-xl-6 col-xxl-6 col-lg-6 col-md-6 col-11 mx-auto rounded-5  '>
            <div className='text-center'>
              <h3>Signup</h3>
            </div>
            <small>{message}</small>
            <div className=' py-4' >
              <input type="text" 
                name='firstName'
                placeholder='Enter your first name'
                className='form-control shadow-none'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.firstName && formik.errors.firstName}</small>
              <input type="text" 
                name='lastName'
                placeholder='Enter your last name'
                className='form-control mt-3 shadow-none'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.lastName && formik.errors.lastName}</small>
              <input type="email" 
                name='email'
                placeholder='Enter your email'
                className='form-control mt-3 shadow-none'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className='text-danger rounded-pill'>{formik.touched.email && formik.errors.email}</small>
              <input type="password" 
                name='password'
                placeholder='Create a strong password'
                className='form-control mt-3 shadow-none'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.password && formik.errors.password}</small>
            </div>
            <div>
              <button type='submit' className='btn btn-info w-100 rounded-pill' disabled={!formik.isValid && !formik.isSubmitting}>Submit</button>
            </div>
             
          </form>
            <div className='col-xl-6 col-xxl-6 col-lg-6 col-md-6 col-11 pt-3 mx-auto'>
              <div className='mt-5 pt-4 d-none d-md-block'></div>
              <div className="text-center">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
               <div className='d-flex gap-2'>
                  <hr style={{width:"100%"}}/>
                  <p>or</p>
                  <hr style={{width:"100%"}}/>
                </div>
                <button className='btn border border-black w-100 mb-4' onClick={handleGoogleSignup}><img src="/images/Google.png" alt="" width={'30px'}/>signup with google</button>
                <button className='btn border border-black w-100'><i class="fa-brands fa-facebook"></i>&nbsp; signup with facebook</button>
                <p className='text-center'>Already having an account?<a href="/login"> login</a></p>
            </div>
        </div>
      </section>


    </>

  )
}

export default Signup