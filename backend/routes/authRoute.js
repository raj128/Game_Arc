import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
import User from "../models/user.model.js";

//signin
router.post("/signup", async (req, res) => {
    // console.log(req.body);
    try{
        const {name, email, password} =req.body;
        if (!name || !password || !email) {
            return res.json({ error: "Please submit all required field" });
        }
        
        User.findOne({email:email})
        .then((savedUser) => {
            if(savedUser){
                return res.json({error:"This Email is already used !"});
            }
            bcrypt.hash(password, 12).then((hashedPwd)=> {
                const user=new User({
                    name:name,
                    email:email,
                    password:hashedPwd,
                });
                user.save()
                    .then((user) => {
                        res.status(200).json({success: true,message :"Saved successfully"});
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            });
        });
    }catch(err){
        next(err);
    }
});

// login
router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ error: "Please provide email and password" });
      }
  
      User.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
          return res.json({ error: "Invalid Email " });
        }
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            const payload = {
              _id: savedUser._id,
              isAdmin: savedUser.isAdmin, // Assuming isAdmin is a property in your User model
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.cookie("access_token", token, {
              httpOnly: true,
            })
            .json({
              success: true,
              isAdmin:savedUser.isAdmin,
              message: "Logged in successfully",
            });
          } else {
            return res.json({
              error: "Invalid password",
            });
          }
        });
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/logout', (req, res) => {
    // Clear the authentication-related cookies
    res.clearCookie('access_token'); // Replace 'your-cookie-name' with the actual cookie name
  
    // Set CORS headers
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000/'); // Replace with your client domain
    // res.header('Access-Control-Allow-Credentials', 'true');
    
    // Send the response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
  
  
  

export default router;