const mongoose=require('mongoose')

const AdminSchema=new mongoose.Schema({
    id:String,
    password:String
})

module.exports=mongoose.model('Admin',AdminSchema)