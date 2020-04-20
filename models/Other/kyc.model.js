const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
   id_number: {
       type: String,
       required: [true, 'ID / IC Number cannot be empty']
   },
   document_type: {
       type: String,
       required: [true, 'Document type cannot be empty']
   },
   country_issued: {
       type: String,
       required: [true, 'Country issued cannot be empty']
   },
   document_image: {
       type: String,
       required: [true, 'Document image cannot be empty']
   },
   home_address: {
       type: String,
       required: [true, 'Home address cannot be empty']
   },
   city: {
       type: String,
       required: [true,  'City cannot be empty']
   },
   zip_code: {
       type: String,
       default : ''
   },
   phone_number1: {
       type: String,
       required: [true, 'Phone number cannot empty']
   },
   phone_number2: {
       type: String,
   },
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   approved_status: {
       type: Boolean,
   },
   admin_review: {
       type: Boolean,
       default: false
   },
   review: {
       type: Boolean,
       default: false
   },
   lock_status: {
    type: Boolean,
    default: true
}
})


const kyc = mongoose.model('KYC', kycSchema);

module.exports = kyc;