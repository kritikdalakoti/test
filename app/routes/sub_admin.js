const express=require('express')
const router=express.Router()
const controller=require('../controllers/subadmin')
const validate=require('../controllers/subadmin_validator')
const SubAdmin_Auth = require('../middleware/subadmin_auth')
const Subadmin_Auth=require('../middleware/subadmin_auth')


router.post(
    '/register',
    validate.validate_Subadmin,  // validate incoming req
    controller.register
)

router.post(
    '/login',
    validate.login_subadmin,
    controller.login
)

router.get(
    '/me',
    Subadmin_Auth,
    (req,res)=>res.send(req.subadmin)
)


router.get(
    '/logout',
    SubAdmin_Auth,
    controller.logout
)

module.exports=router


