// backend auth.js
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"
export const register = async (req,res,next) => {
   const {user,pwd, email} = req.body
   console.log(email)
    if(!user || !pwd) return res.status(400).json({'message':'username and password are required'})
    //check for duplitate usernames in database
    const duplicate = await User.findOne({username:user}).exec()
    if(duplicate) return res.sendStatus(409)//conflict
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(pwd, salt)
        const newUser = new User({
            username:user,
            email:email,
            password:hash,
        })
        await newUser.save()
        res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }
}


export const login = async (req, res, next) => {
  try {
    console.log('backend')
    console.log(req.body)
    const user = await User.findOne({ username: req.body.user });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.pwd,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherDetails);

  } catch (err) {
    next(err);
  }

 
};

