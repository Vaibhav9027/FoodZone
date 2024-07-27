import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user function
const loginUser = async (req,res) =>{
  const {email,password} = req.body;
  try {
    const user = await userModel.findOne({email});
    //if any account is available then email will be stored in "user" variable
    //CHECKING WHETHER USER EXIST OR NOT
    if(!user){
        return res.json({success:false,message:"User Doesn't exist"})
    } 
        //CHECKING PASSWORD
    const isMatch = await bcrypt.compare(password,user.password)//input pw and pw store store in db
    if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials"})
        // retrun response with json method
    }

    //IF PASSWORD MATCHES THEN GENERATING A TOKEN
    const token = createToken(user._id);
    res.json({success:true,token})



  } catch (error) {
   console.log(error);
   res.json({success:false,message:"Error"})


  }
}
// token creation

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}



//register user}
const registerUser = async (req,res) => {
   const {name,password,email} = req.body;//inthese variaable our name,pw, email has been stored
    try {
        //checkng if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exist"})

        }
        //validating email ormat &strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password"})

        }
        //hashing  user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
         
        // creating the new user
        const newUser = new userModel({
            name:name,// that we will get from req.body
            email:email,
            password:hashedPassword,

        })
        //saving the user
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})








    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export{ loginUser,registerUser}