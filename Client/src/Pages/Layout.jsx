import React from 'react'
import Navbar from '../components/Navbar'
import "../Css/Layout.css"
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Outlet/>
      <header>
        <div>
          <h2>Keepify</h2>
        </div>
        <nav>
          <ul className='mt-3'>
            <li><Link to='/login' className='btn btn-success'>Login</Link></li>
             
          </ul>
        </nav>
      </header>
      <main className='main'>
        <section className="container-fluid  ">
          <div className="row ">
            <div className="col-12 hero rounded-4">
              <h1>Organize your thoughts Effortlessly</h1>
            </div>
            <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 hero-2'>
              <p>Enhance your productivity on Keepify intuitive features designed to seamlessly keep all your notes in one secure and accessible platform.</p>
            </div>
            <div className='col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 bg-info d-flex justify-content-end img'>
              <img src="/images/note-list-r.png" alt="" width={'250px'} className='img'/>
            </div>
            <div className='col-11 d-md-none text-center'>
              <img src="/images/note-list-r.png" alt="" width={'200px'}/>
            </div>
            <div className="col-12">
              <Link to='/signup' className='btn btn-success'>Get Stated</Link>
            </div>
          </div>
        </section>
        {/* <div className=''>
          <div className="row">
            <div className='col-12'>
            </div>
            <div className='col-6'>
              <p>Capture your thoughts instantly with [Your App Name], a clean and intuitive note-taking app. Whether it's ideas, tasks, or reminders, keep everything organized in one place. Simple, fast, and distraction-free!</p>
            </div>
            <div className='col-6 text-end'>
              <img src="/images/notebook-r.png" alt="" width={'300px'}/>
              <p>This note-taking book is designed to help you stay organized, focused, and productive. With its high-quality paper and durable cover, this book is perfect for jotting down notes, ideas, and inspiration.
              </p>
            </div>
          </div>
              <li><Link to='/signup' className='btn btn-primary'>Signup</Link></li>
        </div> */}
      </main>
    </>
  )
}

export default Layout