const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    prod_code:String,
    name:String,
    selling_cost:String,
    MRP:String,
    company:String,
    Category:String,
    Subcategory:String,
    image:[{type:String}],
    description:String,
    brand:String,      //tags
    prd_Stats:[{
      year:String,
      stats:{
          jan:Number,
          feb:Number,
          march:Number,
          april:Number,
          may:Number,
          june:Number,
          july:Number,
          aug:Number,
          sept:Number,
          oct:Number,
          nov:Number,
          dec:Number
      }  
    }],
    prd_rvws:[{
        name:String,
        rating:Number,
        reviews:String
    }],
    prod_Subadmins:[{
        type:mongoose.Schema.Types.ObjectId,
    }]
})


module.exports=mongoose.model('Product',ProductSchema)