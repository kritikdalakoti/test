const jwt=require('jsonwebtoken')
const db=require('../../config/mongodb')
const ObjectId=require('mongodb').ObjectID

const SubAdmin_Auth= async(req,res,next)=>{
    try{
        const token = req.cookies['auth_token']
        const decoded= jwt.verify(token,'mysecret')
        const subadmin=await db.db.collection('Subadmin').findOne({_id:ObjectId(decoded._id),isSubAdmin:true})
        if(!subadmin){
            throw new Error()
        }
        req.subadmin=subadmin
        next()
    }catch(e){
        res.status(401).send('You are not logged in as subadmin!!')
    }
}

module.exports=SubAdmin_Auth