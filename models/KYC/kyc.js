const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    id_number: {
      type: String,
      required: [true, "ID / IC Number cannot be empty"],
    },
    country_issued: {
      type: String,
      required: [true, "Country issued cannot be empty"],
    },
    document_imageFrontSide: {
      type: String,
      required: [true, "Document image front side cannot be empty"],
    },
    document_imageBackSide: {
      type: String,
      required: [true, "Document image back side cannot be empty"],
    },
    document_imageSelfieSide: {
      type: String,
      required: [true, "Document image selfie side cannot be empty"],
    },
    home_address: {
      type: String,
      required: [true, "Home address cannot be empty"],
    },
    city: {
      type: String,
      required: [true, "City cannot be empty"],
    },
    zip_code: {
      type: String,
      default: "",
    },
    phone_number1: {
      type: String,
      required: [true, "Phone number cannot empty"],
    },
    phone_number2: {
      type: String,
    },
    approved_status: {
      type: Boolean,
      default: false,
    },
    review: {
      type: Boolean,
      default: false,
    },
    lock_status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("KYCModel", kycSchema);
