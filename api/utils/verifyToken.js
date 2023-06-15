import jwt from "jsonwebtoken"
export const  verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token 
    if(!token){
                 console.error(error);

        return         res.status(401).send('Server error');
    }
    //user: includes information: isAdmin, user id
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return       res.status(403).send('Token is not valid');

        //  next(createError(403,"Token is not valid"))
        req.user = user
        next()
    })
}
export const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
           return       res.status(403).send('You are not autherized');

        }
    })
}
export const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
           return       res.status(500).send('You are not autherized');

        }
    })
}