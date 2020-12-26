
const { validationResult } = require('express-validator')
const jwt=require('jsonwebtoken')
const db=require('../../config/mongodb')
const bcrypt=require('bcryptjs')
//const model = require('../models/user');


exports.findByIdandPassword=async (id,password)=>{
  return new Promise(async (resolve,reject)=>{
    const user=await db.db.collection('Subadmin').findOne({id})
    console.log(user)
    if(!user){
      return reject('id not found')
    }
    const ismatch=password===user.password?true:false
    // const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch){
      return reject('invalid password!!')
    }
    resolve(user)
  })
}


exports.successResponse = (message, data, res) => {
  // Sends error to user
  res.status(200).json({
    status: "success",
    message: message,
    data
  })
}

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
  console.log('hvh',err)
  // Sends error to user
  res.json({
    status: "Error",
    message: "Please see details below",
    errors: err
  })
}


/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  }
}


/**
 * Builds success object
 * @param {string} message - success text
 */
exports.buildSuccObject = message => {
  return {
    msg: message
  }
}




