//user model
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:Number
    },
    refreshToken:String

  },
   {timestamps:true}
)

export default mongoose.model('User',userSchema)