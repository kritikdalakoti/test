const mongoose=require('mongoose')

const Subadmin_Schema= new mongoose.Schema({
    subAdmin_id:String,
    password:String,
    name:String,
    email:String,
    contactno:String,
    pan_Id:String,
    address:String,
    address_Document_proof:String,
    Gst_Number:String,
    annual_turnout:String,
    balance_Sheet:String,
    Electrical_Contact_License:String,
    Storage_Space_availability:Boolean,
    REPAIR_FACILITY_AVAILABILITY:Boolean,
    MOTOR_REPAIR_AVAILABILITY:Boolean,
    TRANSFORMER_REPAIR_AVAILABILITY:Boolean,
    MSME_CERTIFICATE:String,
    EMPLOYEE_COUNT:Number,
    PREFERRED_PINCODES:[{type:String}],
    ASSIGNED_PINCODES:[{type:String}],
    SERVICE_PROVIDERS:[{type:String}],
    STATUS:String,
    isSubAdmin:{default:false}
})

module.exports=mongoose.model('Subadmin',Subadmin_Schema)