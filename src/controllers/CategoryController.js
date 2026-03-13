const categorySchema = require("../models/CategoryModel")

const createCategory = async(req,res)=>{
    try {
        
        const savedCategory = await categorySchema.create(req.body)
        //if else..
        res.status(201).json({
            message:"category created..",
            data:savedCategory
        })

    } catch (error) {
        res.status(500).json({
            message:"error while creating category",
            err:error
        })        
    }
}

const getAllCategories = async(req,res)=>{
    try {
        const categories = await categorySchema.find({status:"Active"})   
        res.status(200).json({
            message:"caategories detched..",
            data:categories
        })
    } catch (error) {   
            res.status(500).json({
                message:"error while fetching categories",
                err:error
            })
    }
}
module.exports ={
    createCategory,
    getAllCategories
}
