const express = require("express");
const userRouter = express.Router()
const passport = require("passport");
const userModel = require('../Model/user.model')
const {home,register, userLogin, getProtected, getGoogle, getToken, } = require('../Controller/user.controller')
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/verifyToken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY

userRouter.get("/", home)
userRouter.post("/register", register)
userRouter.post("/login",userLogin)
userRouter.get("/protected", getProtected)
userRouter.get("/verify", )
userRouter.get('/auth/google/login', 
  passport.authenticate('google', { scope: ['profile', 'email'], state: 'login' })
);
 
userRouter.get('/auth/google/signup', 
  passport.authenticate('google', { scope: ['profile', 'email'], state: 'signup' })
);


userRouter.get("/auth/google/callback", (req, res, next) => {
  const intent = req.query.state; // either "login" or "signup"

  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Error during Google auth callback:", err);
      return res.redirect(`https://keepify-olive.vercel.app/login?error=${encodeURIComponent("A server error occurred.")}`);
    }

    if (!user) {
      const sample = intent === "signup" ? "signup" : "login";
      // Use the message from the strategy (e.g., "User not found" or "User already exists")
      const errorMessage = info?.message || "Authentication failed.";
      return res.redirect(`https://keepify-olive.vercel.app/${sample}?error=${encodeURIComponent(errorMessage)}`);
    }
    try {
      const token = jwt.sign({id:user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
      return res.redirect(`https://keepify-olive.vercel.app/success?token=${token}`);
    } catch (e) {
      console.error("Error signing JWT:", e);
      return res.redirect(`https://keepify-olive.vercel.app/login?error=${encodeURIComponent("Internal server error during token generation.")}`);
    }
  })(req, res, next);
});
 
module.exports = userRouter
