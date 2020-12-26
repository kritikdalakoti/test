
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const utils=require('../middleware/utils')

const db = require('../../config/mongodb');

/**
 * generating token function
 * @param {Object} id - user id 
 * @param {Object} isSubAdmin - property of user telling whether or not the subadmin is verified. 
 */

const generateauthtoken=(id,isSubAdmin)=>{
  const token=jwt.sign({_id:id.toString(),isSubAdmin:isSubAdmin},'mysecret')  //process.env.SECRET
  return token
}


exports.logout= async (req, res,next) => {
    try {
      res.cookie('auth_token','')
      res.send('logged out!!')
    } catch (e) {
      res.status(500).send(e);
    }
}


exports.register=async (req, res) => {
  try{
    const err=validationResult(req)
    if(err.errors.length!==0){
      return utils.handleError(res,errors)
    }
    const doc= db.db.collection('Subadmin').insertOne(req.body)
    utils.successResponse('Added Successfully',doc,res)
  }catch(e){
    utils.handleError(res,e)
  }
  
}

exports.login=async(req,res)=>{
  try{
    const err=validationResult(req)
    if(err.errors.length!==0){
      return utils.handleError(res,errors)
    }
    const id=req.body.id
    const password=req.body.password
    utils.findByIdandPassword(id,password).then(user=>{
    res.cookie('auth_token',generateauthtoken(user._id,user.isSubAdmin))
    res.send(user)  
  })  
  }catch(e){
    utils.handleError(res,e)
  }
}




