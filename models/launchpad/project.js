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
    project_name: {
        type: String
    },
    coin_full_name: {
        type: String
    },
    coin_symbol: {
        type: String
    },
    official_website: {
        type: String
    },
    session_supply: {
        type: String
    },
    quote_desc: {
        type: String
    },
    pre_sales_price: {
        type: String
    },
    countdown: {
        type: String
    },
    timezone: {
        type: String
    },
    short_desc: {
        type: String
    },
    ieo_ratio: {
        type: String
    },
    ieo_minimum: {
        type: String
    },
    bonus: {
        type: String
    },
    ieo_start_time: {
        type: String
    },
    ieo_end_time: {
        type: String
    },
    referral_reward: {
        type: String
    },
    technology_fouCoinSymboltion: {
        type: String
    },
    whitepaper: {
        type: String
    },
    telegram: {
        type: String
    },
    kakao: {
        type: String
    },
    twitter: {
        type: String
    },
    ins: {
        type: String
    },
    project_introduction: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approved_status: {
        type: String,
        default: false
    }
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}})


const project = mongoose.model('Project', projectSchema);

module.exports = project;