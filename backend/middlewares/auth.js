import jwt from "jsonwebtoken"
//-while requesting we will not send the id but the token and this function will convert that into id---this middleware bsically take the token and convert into userid and using that userid we can add remove or get the data from user
const authMiddleware = async (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Autherised login again"})

    }
    try {
        const token_decode =jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;//as we use id whle creating token in usercontroller.js file
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

        
    }
}

export default authMiddleware;
