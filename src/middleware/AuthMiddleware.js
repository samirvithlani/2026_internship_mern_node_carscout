const jwt = require("jsonwebtoken")
const secret = "secret"

const validateToken = async(req,res,next)=>{

    try{

        const token = req.headers.authorization
        console.log(token)
        if(token){
            //token Bearer
            if(token.startsWith("Bearer ")){

                //remove Bearer from token

                const tokenValue = token.split(" ")[1]
                //verifytoken using jwt
                const decodedData = jwt.verify(tokenValue,secret)
                console.log(decodedData)
                next()




            }else{
                res.status(401).json({
                    message:"token is not Bearer token"
                })
            }

        }
        else{
            res.status(401).json({
                message:"token is not present.."
            })
        }
        


    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while validating token",
            err:err
        })
    }
}
module.exports = validateToken