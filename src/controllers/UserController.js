const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const jwt = require("jsonwebtoken")
const secret = "secret"

const registerUser = async(req,res)=>{

    try{
        //const {firstName,lastName,email,password} = req.body   dont do this for now.,.

        //10 is salt round.. please check documentation for more details
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        //const savedUser = await userSchema.create(req.body)
        const savedUser = await userSchema.create({...req.body,password:hashedPassword})
        //send mail...
        await mailSend(savedUser.email,"Welcome to our app","Thank you for registering with our app.")
        res.status(201).json({
            message:"user created successfully",
            data:savedUser
        })

        
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while creating user",
            err:err
        })
    }
}

const loginUser= async(req,res)=>{
    try{
        //select * from users where email =? -->userObj
        //userObj.password[encrypted] --> req.body ->plain password
        //compare() using bcrypt

        const {email,password} = req.body
        //const foundUserFromEmail = await userSchema.findOne({modelColumnName:req.body.email})
        const foundUserFromEmail = await userSchema.findOne({email:email}) //admin@yopmail.com
        console.log(foundUserFromEmail)
        if(foundUserFromEmail){
            //password compare
            const isPasswordMatched = await bcrypt.compare(password,foundUserFromEmail.password)
            //..if password compare it will return true else false
            if(isPasswordMatched){

                   //when user is authenticated... we will geenrate token..
                const token = jwt.sign(foundUserFromEmail.toObject(),secret,{expiresIn:60*24*7})
                //const token = jwt.sign({id:foundUserFromEmail._id},secret)

                res.status(200).json({
                    message:"Login Success",
                    //data:foundUserFromEmail,
                    token:token,
                    role:foundUserFromEmail.role
                })  
            }
            else{
                //401 -->unauthorized
                res.status(401).json({
                    message:"Invalid Credentials"
                })
            }

        }
        else{
            res.status(404).json({
                message:"user not found."
            })
        }




    }catch(err){

        res.status(500).json({
            message:"error while logging in",
            err:err
        })
    }
}

const forgotPassword =async(req,res)=>{


    const {email} = req.body;
    if(!email) return res.status(400).json({
        messsage:"email is not provided."
    })

    const foundUserFromEmail = await userSchema.findOne({email:email})
    if(foundUserFromEmail){
        //token generate..
        const token = jwt.sign(foundUserFromEmail.toObject(),secret,{expiresIn:60*24*7})
        //reset link..
        const url = `http://localhost:5173/resetpassword/${token}`
        //send mail
        const mailtext = `<html>
            <a href ='${url}'>RESET PASSWORD</a>
        </html>`
        await mailSend(foundUserFromEmail.email,"Reset Password Link",mailtext)
        res.status(200).json({
            message:"reset link has been sent to your email"
        })
        

    }
    else{
        res.status(404).json({
            message:"user not found.."
        })
    }



}

const resetPassword = async(req,res)=>{

    const {newPassword,token} = req.body;
    try{

        const decodedUser = await jwt.verify(token,secret) //{userobject}
        const hashedPassword =await  bcrypt.hash(newPassword,10)
        const updatedUser = await userSchema.findByIdAndUpdate(decodedUser._id,{password:hashedPassword})
        res.status(200).json({
            message:"password reset successfully !!",
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"server error..",
            err:err
        })
    }

}


module.exports ={
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}
