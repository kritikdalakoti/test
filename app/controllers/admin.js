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
            return utils.handleError(res,err.errors)
        }
        const doc=await db.db.collection('Products').insertOne(req.body)
        utils.successResponse('Product Added Successfully!',doc.ops,res)
    }catch(e){
        console.log(e)
        utils.handleError(res,e)
    }
}

/**
 * Admin accepting a subadmin thus verifying it
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

 exports.addsubadmin=async(req,res)=>{
     try{
        const subadmin_id=ObjectId(req.params.id)
        const docs=await db.db.collection('Subadmin').findAndModify({_id:subadmin_id},[],{$set:{isSubAdmin:true}})
        utils.successResponse('Verified Subadmin',docs.value,res)
     }catch(e){
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
 * Admin getting all subadmins list route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.get_all_nonverified_subadmins=async(req,res)=>{
    try{
        const docs=await db.db.collection('Sunadmin').find({isSubAdmin:false})
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
            return utils.handleError(res,err.errors)
        }
        const doc=await db.db.collection('Appliances').insertOne(req.body) 
        utils.successResponse('Added Appliance and Services!',doc.ops,res)

    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Admin adding category
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.add_category=async(req,res)=>{
    try{
        const err=validationResult(req)
        if(err.errors.length!==0){
            return utils.handleError(res,err.errors)
        }
        const doc=await db.db.collection('category_Subcategory').insertOne(req.body)
        utils.successResponse('Added Category !!',doc.ops,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Admin adding sub-category
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.add_subcategory=async(req,res)=>{
    try{
        const err=validationResult(req)
        if(err.errors.length!==0){
            return utils.handleError(res,err.errors)
        }
    const doc=await db.db.collection('category_Subcategory').findAndModify({category:req.body.category},[],{$push:{subcategory:req.body.subcategory}})
    utils.successResponse('Added Subcategory!',doc.value,res)
    }catch(e){
        utils.handleError(res,e)
    }
    
}

/**
 * Admin adding sub-category
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

 exports.addcompany=async (req,res)=>{
     try{
        const err=validationResult(req)
        if(err.errors.length!==0){
            return utils.handleError(res,err.errors)
        }
        const doc=await db.db.collection('Company').insertOne(req.body)
        utils.successResponse('Added Company !!',doc.ops,res)
     }catch(e){
utils.handleError(res,e)
     }
 }

/**
 * Api for getting subcategory
 * @param {Object} req - request object
 * @param {Object} res - response object
*/

exports.get_category_subcategories=async(req,res)=>{
    try{
       const docs= await db.db.collection('category_Subcategory').find({})
       var arr=[]
       await docs.forEach(doc=>{
           arr.push(doc)
       })
       utils.successResponse('Categories and Subcategories List',arr,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Api for getting company
 * @param {Object} req - request object
 * @param {Object} res - response object
*/

exports.getcompany=async(req,res)=>{
    try{
       const docs= await db.db.collection('Company').find({})
       var arr=[]
       await docs.forEach(doc=>{
           arr.push(doc)
       })
       utils.successResponse('All Company List',arr,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Admin adding plans
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.addplans=async (req,res)=>{
    try{
        const err=validationResult(req)
        if(err.errors.length!==0){
            return utils.handleError(res,err.errors)
        }
        const doc=await db.db.collection('Plans').insertOne(req.body)
        utils.successResponse('Added Category !!',doc.ops,res)
    }catch(e){
    utils.handleError(res,e)
    }
}

/**
 * Api for getting all plans
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.getplans=async(req,res)=>{
    try{
        const docs= await db.db.collection('Plans').find({})
        var arr=[]
        await docs.forEach(doc=>{
            arr.push(doc)
        })
        utils.successResponse('All Plans',arr,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Api for getting all appliances and services
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.getallappliances=async (reeq,res)=>{
    try{
        const docs= await db.db.collection('Appliances').find({})
        var arr=[]
        await docs.forEach(doc=>{
            arr.push(doc)
        })
        utils.successResponse('All Plans',arr,res)
    }catch(e){
utils.handleError(res,e)
    }
}



/**
 * Api for deleting a particular appliance
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.delete_appliance=async(req,res)=>{
    try{
        const appliance_id= ObjectId(req.params.id) 
        const doc=await db.db.collection('Appliances').deleteOne({_id:appliance_id})
        console.log(doc)
        utils.successResponse('Deleted Appliance',appliance_id,res)
    }catch(e){
        utils.handleError(res,e)
    }
}

/**
 * Api for adding a project
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.addproject=async (req,res)=>{
    try{
        const err=validationResult(req)
        if(err.errors.length!==0){
            return utils.handleError(res,err.errors)
        }
        const doc=await db.db.collection('Project').insertOne(req.body)
        utils.successResponse('Added Project !!',doc.ops,res)
    }catch(e){
    utils.handleError(res,e)
}
}

/**
 * Api for getting all projects
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.getprojects=async(req,res)=>{
    try{
        const docs= await db.db.collection('Project').find({})
        var arr=[]
        await docs.forEach(doc=>{
            arr.push(doc)
        })
        utils.successResponse('All Projects',arr,res)
    }catch(e){
utils.handleError(res,e)
    }
}

/**
 * Api for unpublishing a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.unpublish_product=async(req,res)=>{
    try{
        const product_id=ObjectId(req.params.id)
        await db.db.collection('Products').findAndModify({_id:product_id},[],{$set:{published:false}}) 
        utils.successResponse('Product Unpublished!',product_id,res)
    }catch(e){
utils.handleError(res,e)
    }
}

/**
 * Api for publishing a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.publish_product=async(req,res)=>{
    try{
        const product_id=ObjectId(req.params.id)
        await db.db.collection('Products').findAndModify({_id:product_id},[],{$set:{published:true}}) 
        utils.successResponse('Product published!',product_id,res)
    }catch(e){
utils.handleError(res,e)
    }
}

/**
 * Api for deleting a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.delete_product=async(req,res)=>{
    try{
        const product_id= ObjectId(req.params.id) 
        const doc=await db.db.collection('Products').deleteOne({_id:product_id})
        utils.successResponse('Deleted Appliance',product_id,res)
    }catch(e){
        utils.handleError(res,e)
    }
}