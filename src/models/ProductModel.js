const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
    },
    price:{
        type:Number
    },
    //...... other fileds
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:"categories" // check in category model model name must pass here to bind relation
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    imagePath:{
        type:String
    }
    //assume we have subcatrgoty also
    // subCatgoryId:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"subCategories" // model name.
    // },
    // sellerId:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"users" //check user model..
    // }
})
module.exports = mongoose.model("products",productSchema)