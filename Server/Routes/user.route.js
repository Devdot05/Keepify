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
      return res.redirect(`http://localhost:5174/login?error=${encodeURIComponent("A server error occurred.")}`);
    }

    if (!user) {
      const sample = intent === "signup" ? "signup" : "login";
      // Use the message from the strategy (e.g., "User not found" or "User already exists")
      const errorMessage = info?.message || "Authentication failed.";
      return res.redirect(`http://localhost:5174/${sample}?error=${encodeURIComponent(errorMessage)}`);
    }

    // By the time we get here, the strategy has already handled:
    // - Finding an existing user for login.
    // - Creating a new user for signup.
    // We can now proceed to issue a token.
    try {
      const token = jwt.sign({id:user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
      return res.redirect(`http://localhost:5174/success?token=${token}`);
    } catch (e) {
      console.error("Error signing JWT:", e);
      return res.redirect(`http://localhost:5174/login?error=${encodeURIComponent("Internal server error during token generation.")}`);
    }
  })(req, res, next);
});




// userRouter.get("/auth/google/callback", (req, res, next) => {
//     console.log(req.user);
    

//   const intent = req.query.state; // either "login" or "signup"

//   passport.authenticate("google", { session: false }, async (err, user, info) => {
//     console.log(user);
    
//     if (err) {
//       return res.redirect(`http://localhost:5174/login?error=${encodeURIComponent("Server error")}`);
//     }

//     if (!user) {
//         const sample = req.query.state === "signup" ? "signup" : "login";
//         return res.redirect(`http://localhost:5174/${sample}?error=${encodeURIComponent(info?.message || "Authentication failed")}`);
    
//     }

//     try {
//       const existingUser = await userModel.findOne({ email: user.email });

//       if (intent === "login") {
//         if (!existingUser) {
//           return res.redirect(`http://localhost:5174/login?error=${encodeURIComponent("User not found")}`);
//         }
//       }

//       if (intent === "signup") {
//         if (existingUser) {
//           return res.redirect(`http://localhost:5174/signup?error=${encodeURIComponent("User already exists")}`);
//         }
//         // user was already created inside strategy
//       }

//       const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
//       return res.redirect(`http://localhost:5174/success?token=${token}`);
//     } catch (e) {
//       console.error("Error during Google auth callback:", e);
//       return res.redirect(`http://localhost:5174/login?error=${encodeURIComponent("Internal server error")}`);
//     }
//   })(req, res, next);
// });


// callback url
// userRouter.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}));
// userRouter.get("/auth/google/callback", 
//     passport.authenticate('google', {failureRedirect: '/login'}),
//     (req, res) => {
//         const user = req.user;
//     //    console.log("Logged-in user:", req.user)
        
//         const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        

//         res.redirect(`http://localhost:5174/success?token=${token}`);

//     }
// )
module.exports = userRouter
