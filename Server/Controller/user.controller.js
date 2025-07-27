const { model } = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const userModel = require('../Model/user.model');
require('dotenv').config()
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY
const  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const  GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL

const home = (req, res) => {
    res.send("Welcome")
}
const register = (req, res) => {
    console.log(req.body);
    const form = new userModel(req.body)
    form.save()
    .then((response) => {
        console.log(response);
        console.log("save successful");
        res.send({status:true, message: "registration was successful"});
       
        
        
    })
    .catch((err) => {
        console.log(err);
        if(err.code === 11000) {
            res.send({status: false, message: "email is already in use"})
        }
        
    })
}




// const client = new GoogleStrategy(
//     GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET,
//     GOOGLE_REDIRECT_URL
// )

// const getGoogle = (req, res) => {
//     const url = client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['profile', 'email']
//     })
//     console.log(client);
    
// }

let userLogin = (req, res) => {
    // console.log(req.body);
    userModel.findOne({email: req.body.email})
    .then((user) => {
        if(user){
            user.validatePassword(req.body.password, (err, same) => {
                if(err){
                    console.log(err);
                    
                }else{
                    if(same){
                        // console.log(user);
                        let token = jwt.sign({email: req.body.email},SECRET_KEY, {expiresIn: "1h"},)
                        // console.log(token);
                        
                        res.send({status: true, message: "login successful", token, user})
                    }else{
                        console.log('wrong email or password');
                        res.send({status: false, message: "wrong email or password"})
                    }

                }
            })
        }else{
            console.log("user does not exit");
            res.send({status:false, message: "wrong email or password"})
        }
        
    }).catch((err) => {
        console.log(err);
        
    })
    
}

const getProtected = async(req, res) => {
    console.log(req.body);
    try{
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET_KEY, async(err, result)=>{
            if(err){
                console.log(err);
                res.send({status: false, message: "session expired. Kindly signin again"})
            }else{
                console.log(result.email);
                let user = await userModel.findOne({email: result.email})
                console.log(user);
                
               if (!user) {
                    return res.status(404).json({ status: false, message: "User not found" });
                }

                console.log("Authenticated user:", user.email);
                res.json({ status: true, message: "Login successful", user });
            }
        })

    }catch(err){

    }
    
    
    
}


// Google signup

// passport.serializeUser((user, done) => {
//   done(null, user._id); // or user.id if you're using MongoDB
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:7000/auth/google/callback",
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const intent = req.query.state; // "login" or "signup"

    // Always check by email — safer than relying only on Google ID
    const email = profile.emails[0].value;
    const existingUser = await userModel.findOne({ email });

    if (intent === "login") {
      if (!existingUser) {
        return done(null, false, { message: "User not found" });
      }
      return done(null, existingUser);
    }

    if (intent === "signup") {
      if (existingUser) {
        return done(null, false, { message: "User already exists" });
      }

      const newUser = new userModel({
        googleId: profile.id,
        firstName: profile.name?.givenName || "Google",
        lastName: profile.name?.familyName || "User",
        email,
        password: "google-auth",
        provider: "google"
      });

      await newUser.save();
      return done(null, newUser);
    }

    // If neither login nor signup intent, reject
    return done(null, false, { message: "Unknown intent" });

  } catch (err) {
    return done(err, null);
  }
}));

 
const getToken = async(req, res) => {
    try{
        const user = await userModel.findOne({email: req.user.email})
        console.log(user);
        
        if(!user) return res.status(401).json({message: "user not found"})
        res.status(200).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })
    }catch(err) {
        console.error("Error in /me route:", err);
        res.status(500).json({ message: "Server error", err });
    }
}
 

 

module.exports = {home,register,userLogin, getProtected, getToken}