import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import "../Css/Layout.css";

const Layout = () => {
  return (
    <>
      {/* Navbar */}
      <header className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-4 fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h2 className="text-white mb-0">Keepify</h2>
          <nav>
            <ul className="navbar-nav flex-row gap-3 mb-0">
              <li className="nav-item">
                <Link to='/login' className='btn btn-success'>Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Outlet for nested routes */}
      <Outlet />

      {/* Hero Section */}
      <main className='main bg-dark text-white py-5 d-flex align-items-center justify-content-center'>
        <section className="container py-5">
          <div className="row align-items-center justify-content-center">

            {/* Hero Text */}
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <h1 className="display-5 fw-bold mb-3">Organize your thoughts effortlessly</h1>
              <p className="lead mb-4">
                Enhance your productivity with Keepify’s intuitive features, designed to seamlessly keep all your notes in one secure and accessible platform.
              </p>
              <Link to='/signup' className="btn btn-success btn-lg">Get Started</Link>
            </div>

            {/* Hero Image */}
            <div className="col-12 col-md-6 text-center text-md-end">
              <img 
                src="/images/note-list-r.png" 
                alt="Notes Illustration" 
                className="img-fluid rounded" 
                style={{ maxWidth: '350px' }}
              />
            </div>

          </div>
        </section>
      </main>
    </>
  );
}

export default Layout;