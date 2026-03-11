const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String
    },
    statys:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }
})
module.exports = mongoose.model("categories",categorySchema)