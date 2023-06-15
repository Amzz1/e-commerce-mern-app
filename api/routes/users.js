import express from "express";
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import User from '../models/User.js'
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router()

router.get('/checkauthentication', verifyToken, (req,res,next) =>{
    res.send("hello, user")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account")
})
router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello user, you are logged in and you can delete all accounts")
})
//create
router.post('/',createUser)

//update
router.put('/:id',updateUser)

// delete
router.delete('/:id',deleteUser)

//get
router.get('/:id',getUser)

//getAll
router.get('/',getAllUser)

export default router

