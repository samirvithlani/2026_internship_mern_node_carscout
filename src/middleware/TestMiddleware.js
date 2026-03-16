const testMiddleware = (req,res,next)=>{
    console.log("middleware called...")
    next()
}
module.exports = testMiddleware