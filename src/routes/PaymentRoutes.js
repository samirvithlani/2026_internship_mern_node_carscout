const router = require("express").Router()
const paymentController = require("../controllers/PaymentController")

router.post("/create-order",paymentController.createRazorPayOrder)
router.post("/verify-payment",paymentController.verifyPayment)
module.exports = router