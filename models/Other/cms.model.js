const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    category: {
        type: String,
        required: [true, 'Category cannot be empty']
    },
    description: {
        type: String,
        required: [true, 'Description cannot be emtpy']
    }

},{versionKey: false, timestamps: {createdAt: 'createdAt'}})


const cms = mongoose.model('CMS', cmsSchema);

module.exports = cms;