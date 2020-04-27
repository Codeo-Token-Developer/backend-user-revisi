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
    legal_opinion_document: {
        type: String,
    },

    project_name: {
        type: String,
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
    permanent_link: {
        type: String,
    },
    nature_project: {
        type: String,
    },
    other_nature_project: {
        type: String,
    },
    main_application: {
        type: String,
    },
    target_industry: {
        type: String,
    },
    project_target: {
        type: String,
    },
    brief_project_history: {
        type: String,
    },
    accrue_native_digital_asset: {
        type: String,
    },
    long_term_vision: {
        type: String,
    },
    quarterly_project_roadmap: {
        type: String,
    },
    current_development: {
        type: String,
    },
    native_digital_necessary: {
        type: String,
    },
    comprehensive_description: {
        type: String,
    },
    limit_number_token_held: {
        type: String,
    },
    existing_platform: {
        type: String,
    },
    differentiate_project: {
        type: String,
    },
    how_many_users: {
        type: String
    },
    social_communities: {
        type: String,
    },
    developer_communities: {
        type: String,
    },
    level_development: {
        type: String,
    },
    product_demos: {
        type: String,
    },
    users_intended_purpose: {
        type: String
    },
    applicable_feature: {
        type: String,
    },
    other_applicable_feature: {
        type: String
    },
    associated_with_token: {
        type: String,
    },
    smart_contract_underlying: {
        type: String,
    },
    is_open_source: {
        type: String,
    },
    other_is_open_source: {
        type: String,
    },
    team_member: {
        type: String,
    },
    team_member_not_fulltime: {
        type: String,
    },
    team_members_involved: {
        type: String,
    },
    all_projects_currently: {
        type: String,
    },
    project_advistors: {
        type: String,
    },
    identifies_each_member: {
        type: String
    },
    fundraising: {
        type: String,
    },
    chart_detailing: {
        type: String,
    },
    owned_by_members: {
        type: String,
    },
    multiple_private: {
        type: String,
    },
    anticipated_codeo: {
        type: String,
    },
    expected_public: {
        type: String,
    },
    total_supply: {
        type: String,
    },
    conversion_price: {
        type: String,
    },
    countries_excluded: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const project = mongoose.model('Project', projectSchema);

module.exports = project;