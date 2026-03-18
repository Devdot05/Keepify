import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const url = "https://keepify-1.onrender.com/register";
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMsg = params.get("error");
    if (errorMsg) setError(decodeURIComponent(errorMsg));
  }, [location]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMessage("");
      try {
        const response = await axios.post(url, values);
        if (response.data.status) {
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
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

  const handleGoogleSignup = () => {
    window.location.href = "https://keepify-1.onrender.com/auth/google/signup";
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
          <h1 className="text-center mb-3">Create Account</h1>

          {error && <p className="text-danger text-center">{error}</p>}
          {message && <p className="text-danger text-center">{message}</p>}

          <form onSubmit={formik.handleSubmit} className="mb-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control mb-2 shadow-none"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <small className="text-danger">
              {formik.touched.firstName && formik.errors.firstName}
            </small>

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control mb-2 shadow-none mt-2"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <small className="text-danger">
              {formik.touched.lastName && formik.errors.lastName}
            </small>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2 shadow-none mt-2"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <small className="text-danger">
              {formik.touched.email && formik.errors.email}
            </small>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-2 shadow-none mt-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <small className="text-danger">
              {formik.touched.password && formik.errors.password}
            </small>

            <button
              type="submit"
              className="btn btn-success w-100 rounded-pill mt-3"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Sign Up
            </button>
          </form>

          <div className="d-flex align-items-center mb-3">
            <hr className="flex-grow-1" />
            <span className="px-2">or</span>
            <hr className="flex-grow-1" />
          </div>

          <button
            className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
            onClick={handleGoogleSignup}
          >
            <img src="/images/Google.png" alt="Google" width="25" />
            Signup with Google
          </button>

          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
            <i className="fab fa-facebook"></i> Signup with Facebook
          </button>

          <p className="text-center mb-0">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      )}
    </section>
  );
};

export default Signup;