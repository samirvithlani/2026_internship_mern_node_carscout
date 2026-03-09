const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")

const registerUser = async(req,res)=>{

    try{
        //const {firstName,lastName,email,password} = req.body   dont do this for now.,.

        //10 is salt round.. please check documentation for more details
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        //const savedUser = await userSchema.create(req.body)
        const savedUser = await userSchema.create({...req.body,password:hashedPassword})
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


module.exports ={
    registerUser
}
