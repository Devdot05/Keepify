import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const url = "https://keepify-1.onrender.com/login";

  // Formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      setLoading(true);
      setMessage("");
      try {
        const response = await axios.post(url, values);

        if (response.data.status) {
          const userDetails = response.data.user;
          localStorage.setItem("users", JSON.stringify(userDetails));
          localStorage.setItem("token", response.data.token);

          setTimeout(() => {
            setLoading(false);
            navigate(`/dashboard/${userDetails._id}`);
          }, 1000);
        } else {
          setTimeout(() => {
            setLoading(false);
            setMessage(response.data.message);
          }, 1000);
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        setMessage("Something went wrong. Please try again.");
      }
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMsg = params.get("error");
    if (errorMsg) setError(decodeURIComponent(errorMsg));
  }, [location]);

  const handleGoogleLogin = () => {
    window.location.href = "https://keepify-1.onrender.com/auth/google/login";
  };

  return (
    <section className="bg-dark vh-100 d-flex align-items-center">
      {loading ? (
        <div className="text-center w-100">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card p-4 shadow-lg mx-auto col-11 col-md-8 col-lg-6 rounded-4">
          <h1 className="text-center mb-3">Welcome Back</h1>

          {error && <p className="text-danger text-center">{error}</p>}
          {message && <p className="text-danger text-center">{message}</p>}

          <form onSubmit={formik.handleSubmit} className="mb-3">
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-control shadow-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="form-control shadow-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 rounded-pill"
            >
              Login
            </button>
          </form>

          <div className="d-flex align-items-center mb-3">
            <hr className="flex-grow-1" />
            <span className="px-2">or</span>
            <hr className="flex-grow-1" />
          </div>

          <button
            className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
            onClick={handleGoogleLogin}
          >
            <img src="/images/Google.png" alt="Google" width="25" />
            Login with Google
          </button>

          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
            <i className="fab fa-facebook"></i> Login with Facebook
          </button>

          <p className="text-center mb-0">
            Don&apos;t have an account? <a href="/signup">Register</a>
          </p>
        </div>
      )}
    </section>
  );
};

export default Login;