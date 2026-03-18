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
                const token = jwt.sign(foundUserFromEmail.toObject(),secret,{expiresIn:60})
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


module.exports ={
    registerUser,
    loginUser
}
