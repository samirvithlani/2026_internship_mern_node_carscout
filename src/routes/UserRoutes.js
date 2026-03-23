const router = require("express").Router()
const userController = require("../controllers/UserController")
router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.post("/forgotpassword",userController.forgotPassword)
router.put("/resetpassword",userController.resetPassword)
module.exports = router
