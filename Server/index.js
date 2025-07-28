const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 2224
const userRouter = require("./Routes/user.route")
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongodb_uri = process.env.URI
const noteRouter = require('./Routes/note.route');
const SESSION_SECRET = process.env.SESSION_SECRET
const User = require("./Model/user.model")
const MongoStore = require('connect-mongo')

passport.serializeUser((user, done) => {
    done(null, user.id); // or user._id
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
app.use(cookieParser())
app.use(cors({
    origin: ["https://keepify-olive.vercel.app/","http://localhost:5174"],
    credentials: true
}))
app.use(express.json({limit:"500mb"}))
app.use(express.urlencoded({extended:true, limit:"500mb"}))

//session
app.use(session({ 
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongodb_uri,
        collectionName: 'sessions',
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => {
  res.send(`Login successful. Token: ${req.query.token}`);
});

app.use("/",userRouter, noteRouter)
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
    
})