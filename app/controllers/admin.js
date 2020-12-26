const db = require('../../config/mongodb');
const utils=require('../middleware/utils')
const {validationResult}=require('express-validator')
const ObjectId=require('mongodb').ObjectID
const multer=require('multer')


/**
 * admin add product controller
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.addproduct=async (req,res)=>{
    try{
        const err=validationResult(req)
        if(err.errors.length!==0){
            return utils.handleError(res,errors)
        }
        const doc=await db.db.collection('Products').insertOne(req.body)
        utils.successResponse('Product Added Successfully!',doc,res)
    }catch(e){
        console.log(e)
        utils.handleError(res,e)
    }
}

/**
 * Admin getting all subadmins list route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.get_all_subadmins=async(req,res)=>{
    try{
        const docs=await db.db.collection('Subadmin').find({isSubAdmin:true})
        var arr=[]
        await docs.forEach(element => {
        arr.push(element)
     })
        utils.successResponse('Allsubadmins',arr,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Admin getting all published products controller
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.get_Published_Products=async(req,res)=>{
    try{
        const docs=await db.db.collection('Products').find({published:true})
        var arr=[]
        await docs.forEach(element=>{
            arr.push(element)
        })
        utils.successResponse('All_Products',arr,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Admin removing a specific subadmin
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.removal_Subadmins=async (req,res)=>{
    try{
        const id= ObjectId(req.params.id) 
        console.log(id)
        await db.db.collection('Subadmin').deleteOne({_id:id,isSubAdmin:true})
        utils.successResponse('Deleted Subadmin',id,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Admin adding appliance and services controller
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.add_appliance_and_services=async(req,res)=>{
    try{
        const err=validationResult(req)
        console.log(err)
        if(err.errors.length!==0){
            return utils.handleError(res,errors)
        }
        const doc=await db.db.collection('Appliances').insertOne(req.body) 
        utils.successResponse('Added Appliance and Services!',doc,res)

    }catch(e){
        utils.handleError(res,e)
    }
}



