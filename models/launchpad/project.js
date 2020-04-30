const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    full_name: {
        type:String,
        required: [true, 'Full name cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'Email address cannot be empty']
    },
    position: {
        type: String,
        required: [true, 'Position cannot be empty']
    },
    other_position: {
        type: String,
    },
    pitch: {
        type: String
    },
    regulated: {
        type: String,
        required: [true, 'Regulated cannot be emtpy']
    },
    other_regulated: {
        type: String,
    },
    nda_signed: {
        type: String,
        required: [true, 'NDA Signed cannot be empty']
    },
    legal_option_document: {
        type: String,
    },
    project_name: {
        type: String,
        required: [true, 'Project name cannot be emtpy']
    },
    coin_full_name: {
        type: String,
        required: [true, 'Coin full name cannot be empty']
    },
    coin_symbol: {
        type: String,
        required: [true, 'Coin symbol cannot be empty']
    },
    official_website: {
        type: String,
        required: [true, 'Official web cannot be empty']
    },
    whitepaper_link: {
        type: String,
        required: [true, 'Whitepaper cannot be empty']
    },
    project_nature: {
        type: String,
        required: [true, 'Project nature cannot be empty']
    },
    other_nature: {
        type: String,
    },
    main_application: {
        type: String,
        required: [true, 'Main application cannot be empty']
    },
    target_industry: {
        type: String,
        required: [true, 'industry target cannot be empty']
    },
    clients_type: {
        type: String,
        required: [true, 'Clients type cannot be empty']
    },
    brief_project_history: {
        type: String,
        required: [true, 'Brief project history cannot be empty']
    },

})


const project = mongoose.model('Project', projectSchema);

module.exports = project;