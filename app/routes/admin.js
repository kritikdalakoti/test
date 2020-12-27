const express=require('express')
const validate=require('../controllers/admin_validate')
const router=express.Router()
const controllers=require('../controllers/admin')
const AdminAuth=require('../middleware/admin_Auth')
const multer=require('multer')
const path=require('path')
// multer setup

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
        if(!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)){
            cb(new Error('File must be an image!!'))   
        }
        cb(undefined,true)
    }
})



/**
 * admin add product route
 */

router.post(
    '/addproduct',
    validate.addproduct,
    upload.array('avatar'),
    controllers.addproduct
)

/**
 * Admin getting list of all verified subadmins routes
 */
router.get(
    '/all_subadmin',
    controllers.get_all_subadmins
)

router.get(
    '/all_nonverified_subadmin',
    controllers.get_all_nonverified_subadmins
    
)

/**
 * Admin getting list of all published products route
 
 */

router.get(
    '/all_products',
    controllers.get_Published_Products
)

/**
 * Admin deleting a particular subadmin route

 */

router.delete(
    '/remove_Subadmin/:id',
    controllers.removal_Subadmins
)

/**
 * Admin adding appliance and service
 */

router.post(
    '/createService',
    validate.appliance_services,
    controllers.add_appliance_and_services
)

router.post(
    '/add_category',
    validate.add_category,
    controllers.add_category
)

router.post(
    '/add_subcategory',
    validate.add_subcategory,
    controllers.add_subcategory
)

router.get(
    '/get_category_subcategory',
    controllers.get_category_subcategories
)



module.exports=router