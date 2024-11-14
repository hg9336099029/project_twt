import User from '../models/User.model.js';
import bcrypt from "bcrypt";
export const signup = async(req,res)=>{
  try{
  const {fullName,username,email,password}=req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    return req.status(400).json({error: "Invalid email format"});
  }

  const existingUser = await User.findOne({username});
  if(existingUser){
    return res.status(400).json({error: "Username already exists"});
    }
    const existingEmail = await User.findOne({email});
  if(existingEmail){
    return res.status(400).json({error: "email is already taken"});
  }

  // hashed pasword
  // 12346 => 1hhkjhsnjkksn
  const salt =await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const newUser = new User({
    fullName,
    username,
    email,
    password: hashedPassword, 
  })

  if(newUser){
    generateTokenAndSetCookie(username._id,res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
  }
  else{
     res.status(400).json({error: "Invalid user data"});
   }
  }
  catch(error){
    res.status(500).json({error: "Internal Server Error"});
  }
    
}

export const  login= async(req,res)=>{
    res.json({
      data: "You hit the signup endpoint",
    });
}

export const logout = async(req,res)=>{
    res.json({
      data: "You hit the signup endpoint",
    });
}