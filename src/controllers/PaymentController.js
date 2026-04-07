const Razorpay = require("razorpay")
const crypto = require("crypto")
require("dotenv").config()
const bookingSchema = require("../models/BookingModel")
const RAZORPAY_KEY=process.env.RAZORPAY_KEY
const RAZORPAY_SECRET=process.env.RAZORPAY_SECRET

const razorpay = new Razorpay({
    key_id:RAZORPAY_KEY,
    key_secret:RAZORPAY_SECRET
})

const createRazorPayOrder = async(req,res)=>{

    try{

        const options={
            amount:Number(req.body.amount)*100, //paisa..
            currency:"INR",
            receipt:"receipt_order_id",
            payment_capture:1
        }

        const order = await razorpay.orders.create(options)
        res.status(200).json({
            success:true,
            order
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}

const verifyPayment = async(req,res)=>{

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac("sha256",RAZORPAY_SECRET).update(body.toString()).digest("hex")

    if(expectedSignature === razorpay_signature){
        //db entry..
        await bookingSchema.create({
            razorpayOrderId:razorpay_order_id,
            razorpayPaymentId:razorpay_payment_id,
            razorpaySignature:razorpay_signature,
            amount:req.body.amount,
            currency:"INR",
            status:"success",
            bookingId:Math.floor(Math.random()*1000000000000)
        })
        res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }else{
        await bookingSchema.create({
            razorpayOrderId:razorpay_order_id,
            razorpayPaymentId:razorpay_payment_id,
            razorpaySignature:razorpay_signature,
            amount:req.body.amount,
            currency:"INR",
            status:"failed",
            bookingId:Math.floor(Math.random()*1000000000000)
        })  
        res.status(400).json({
            success:false,
            message:"Payment Verification Failed"
        })
    }
}

module.exports = {
    createRazorPayOrder,
    verifyPayment
}