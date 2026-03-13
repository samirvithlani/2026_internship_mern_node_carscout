const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    //_id
    name:{
        type:String
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }
})
module.exports = mongoose.model("categories",categorySchema)