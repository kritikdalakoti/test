const express=require('express')
const router=express.Router()
const controller=require('../controllers/subadmin')
const validate=require('../controllers/subadmin_validator')
const SubAdmin_Auth = require('../middleware/subadmin_auth')
const Subadmin_Auth=require('../middleware/subadmin_auth')
const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname,'../../public/my-uploads'))
    },
    filename:(req,file,cb)=>{
        cb(undefined,Date.now()+'-'+file.originalname)
    }
})


const upload=multer({
    storage,
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|pdf|jpg|gif)$/)){
            cb(new Error('File must be an image!!'))   
        }
        cb(undefined,true)
    }
})


router.post(
    '/register_Subadmin',
    validate.validate_Subadmin,  // validate incoming req
    upload.fields([{name:'address_document_proof',maxCount:1},{name:'balance_sheet',maxCount:1},{name:'Electrical_Contact_License',maxCount:1}]),
    controller.register
)

router.post(
    '/login_Subadmin',
    validate.login_subadmin,
    controller.login
)

router.get(
    '/me',
    Subadmin_Auth,
    (req,res)=>res.send(req.subadmin)
)


router.get(
    '/logout_Subadmin',
    SubAdmin_Auth,
    controller.logout
)

module.exports=router


