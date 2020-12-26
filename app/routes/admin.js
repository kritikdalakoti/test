const express=require('express')
const validate=require('../controllers/admin_validate')
const router=express.Router()
const controllers=require('../controllers/admin')
const AdminAuth=require('../middleware/admin_Auth')

/**
 * admin add product route
 */

router.post(
    '/addproduct',
    validate.addproduct,
    controllers.addproduct
)

/**
 * Admin getting list of all subadmins routes
 */
router.get(
    '/all_subadmin',
    controllers.get_all_subadmins
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

module.exports=router