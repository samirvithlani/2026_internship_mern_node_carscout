const productSchema = require("../models/ProductModel")
const uploadToCloudinary = require("../utils/CloudinaryUtil")
const createProduct = async(req,res)=>{
    
    try{
    
        //to access file path
        //console.log("file....",req.file)
        //const savedProduct = await productSchema.create(req.body)
        //const savedProduct = await productSchema.create({...req.body,imagePath:req.file.path})
        const cloudinaryResponse = await uploadToCloudinary(req.file.path)
        console.log("cloudinaryResponse",cloudinaryResponse) //secure_url
        const savedProduct = await productSchema.create({...req.body,imagePath:cloudinaryResponse.secure_url})

        res.status(201).json({
            message:"product created successfully",
            savedProduct:savedProduct
        })

    }catch(err){
        res.status(500).json({
            message:"error while creating body",
            err:err
        })
    }
}

const getAllProducts = async(req,res)=>{
    try{

        //const products = await productSchema.find({status:"active"})
        const products = await productSchema.find({status:"active"}).populate("categoryId")
        res.status(200).json({
            message:"products fetched successfully",
            products:products
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while fetching products",
            err:err
        })
    }
}
module.exports ={
    createProduct,
    getAllProducts
}