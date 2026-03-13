const productSchema = require("../models/ProductModel")
const createProduct = async(req,res)=>{
    
    try{
    
        const savedProduct = await productSchema.create(req.body)
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