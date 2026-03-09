const router = require("express").Router()
const userController = require("../controllers/UserController")
router.post("/register",userController.registerUser)
module.exports = router
