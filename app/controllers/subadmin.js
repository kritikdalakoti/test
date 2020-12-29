
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const utils=require('../middleware/utils')
const ObjectId=require('mongodb').ObjectID
const db = require('../../config/mongodb');
const assert=require('assert')




/**
 * generating token function
 * @param {Object} id - user id 
 * @param {Object} isSubAdmin - property of user telling whether or not the subadmin is verified. 
 */

const generateauthtoken=(id,isSubAdmin)=>{
  const token=jwt.sign({_id:id.toString(),isSubAdmin:isSubAdmin},'mysecret')  //process.env.SECRET
  return token
}

/**
 * Api for logging out subadmin
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.logout= async (req, res,next) => {
    try {
      res.cookie('auth_token','')
      res.send('logged out!!')
    } catch (e) {
      res.status(500).send(e);
    }
}

/**
 * Api for registering a subadmin
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.register=async (req, res) => {
  try{
    const err=validationResult(req)
    console.log(req.files)
    if(err.errors.length!==0){
      return utils.handleError(res,errors)
    }
    
    const doc= await db.db.collection('Subadmin').insertOne(req.body)
    utils.successResponse('Added Successfully',doc.ops,res)
  }catch(e){
    utils.handleError(res,e)
  }
  
}

/**
 * Api for logging in 
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.login=async(req,res)=>{
  try{
    const err=validationResult(req)
    if(err.errors.length!==0){
      return utils.handleError(res,errors)
    }
    const id=req.body.id
    console.log(id)
    const password=req.body.password
    utils.findByIdandPassword(id,password).then(user=>{
    res.cookie('auth_token',generateauthtoken(user._id,user.isSubAdmin))
    res.send(user)  
  })  
  }catch(e){
    utils.handleError(res,e)
  }
}

/**
 * Api for Subadmin adding a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.addproduct=async(req,res)=>{
  try{
    const product_id=ObjectId(req.params.id)
    const Subadmin_Id=req.subadmin._id
    const obj={product_id,Subadmin_Id}
    const doc=await db.db.collection('Subadmin_Products').insertOne(obj)
    utils.successResponse('Product Added with Subadmin',doc.ops,res)
  }catch(e){
    utils.handleError(e)
  }
} 


/**
 * Api for Subadmin adding a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

 exports.getproducts=async(req,res)=>{
   try{
     const subadmin_id=req.subadmin._id
     db.db.collection('Subadmin_Products').aggregate([
      {
        $match:{Subadmin_Id:subadmin_id}
      },
      {
        $lookup:{
          "from": "Products",
          "localField": "product_id",
          "foreignField": "_id",
          "as": "Subadmin_Products"
        }
      },
      {
        $unwind:'$Subadmin_Products'
      },
      {
        $project:{
          'company':'$Subadmin_Products.company',
          'name':'$Subadmin_Products.name',
          'MRP':'$Subadmin_Products.MRP',
          'description':'$Subadmin_Products.description',
          'selling_cost':'$Subadmin_Products.selling_cost',
        }
      }
      
      
    ]).toArray((err,doc)=>{
      if(!err){
        utils.successResponse('SUbadmin Products',doc,res)
      }else{
        utils.handleError(res,err)
      }
    })
    
 }catch(e){
utils.handleError(res,e)
 }
}


