const jwt=require('jsonwebtoken')
const db=require('../../config/mongodb')
const ObjectId=require('mongodb').ObjectID

const Admin_Auth= async(req,res,next)=>{
    try{
        const token = req.cookies['auth_token']
        const decoded= jwt.verify(token,'mysecret')
        const admin=await db.db.collection('Admin').findOne({_id:ObjectId(decoded._id),isAdmin:true})
        if(!admin){
            throw new Error()
        }
        req.admin=admin
        next()
    }catch(e){
        res.status(401).send('You are not logged in as admin!!')
    }
}

module.exports=Admin_Auth