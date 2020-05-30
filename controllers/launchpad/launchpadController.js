const Project = require('../../models/launchpad/project');

class LaunchpadController {

    static step1(req,res,next) {
        let user = req.decoded.id;
        console.log(req.body);
        let { 
            full_name, 
            email, 
            position, 
            other_position, 
            pitch, 
            regulated, 
            other_regulated, 
            nda_signed, 
            legal_opinion_document 
        } = req.body;
            Project.create({full_name, email, position, other_position, pitch, regulated, other_regulated, nda_signed, legal_opinion_document, user})
            .then(project => {
                console.log(project)
                res.status(202).json(project)
            })
            .catch(next);
    };

    static step2(req,res,next) {
        let user = req.decoded.id;
        let { 
            project_name, 
            coin_full_name, 
            coin_symbol, 
            official_website, 
            permanent_link,
            nature_project,
            other_nature_project,
            main_application,
            target_industry,
            project_target,
            brief_project_history,
            accrue_native_digital_asset,
            long_term_vision,
            quarterly_project_roadmap,
            current_development,
            native_digital_necessary,
            comprehensive_description,
            limit_number_token_held,
            existing_platform,differentiate_project
        } = req.body;

        Project.updateOne({user},{
            project_name, 
            coin_full_name, 
            coin_symbol, 
            official_website, 
            permanent_link,
            nature_project,
            other_nature_project,
            main_application,
            target_industry,
            project_target,
            brief_project_history,
            accrue_native_digital_asset,
            long_term_vision,
            quarterly_project_roadmap,
            current_development,
            native_digital_necessary,
            comprehensive_description,
            limit_number_token_held,
            existing_platform,
            differentiate_project,
            next_step: 3
        })
            .then(() => {
                res.status(200).json({messsage: 'Project has been updated'})
            })
            .catch(next)

    };

    static step3(req,res,next) {
        let user = req.decoded.id;
        let { 
            how_many_users, 
            social_communities,
            developer_communities 
            } = req.body;
        Project.updateOne({user}, {how_many_users, social_communities, developer_communities,next_step: 4})
            .then(() => {
                res.status(201).json({message: 'Project has been updated'})
            })
            .catch(next)
    };

    static step4(req,res,next) {
        let user = req.decoded.id;
        let { 
            level_development, 
            product_demos, 
            users_intended_purpose, 
            applicable_feature, 
            other_applicable_feature,  
            associated_with_token,
            smart_contract_underlying,
            is_open_source,
            other_is_open_source,
            open_source_documentation,
            github            
        } = req.body; 

        Project.updateOne({user}, { level_development, 
            product_demos, 
            users_intended_purpose, 
            applicable_feature, 
            other_applicable_feature,  
            associated_with_token,
            smart_contract_underlying,
            is_open_source,
            other_is_open_source,
            open_source_documentation,
            github,
            next_step: 5 
        })
            .then(() => {
                res.status(201).json({message: 'Project has been updated'})
            })
            .catch(next);
    };

    static step5(req,res,next) {
        let user = req.decoded.id;
        let { 
            team_member,
            team_member_not_fulltime,
            team_members_involved,
            all_projects_currently,
            project_advistors,
            identifies_each_member
         } = req.body;
        Project.updateOne({user}, { 
            team_member,
            team_member_not_fulltime,
            team_members_involved,
            all_projects_currently,
            project_advistors,
            identifies_each_member,
            next_step: 6
         })
         .then(() => {
             res.status(201).json({message: 'Project has been updated'})
         })
         .catch(next);

    };

    static step6(req,res,next) {
        let user = req.decoded.id;
        let { 
            fundraising, 
            chart_detailing, 
            owned_by_members,
             multiple_private, 
             anticipated_codeo, 
             expected_public,
             total_supply,
             conversion_price,
             countries_excluded
            } = req.body;

            Project.updateOne({user}, { 
                fundraising, 
                chart_detailing, 
                owned_by_members,
                 multiple_private, 
                 anticipated_codeo, 
                 expected_public,
                 total_supply,
                 conversion_price,
                 countries_excluded,
                 next_step: 7
                })
                .then(() => {
                    res.status(201).json({message: 'Project has been updated'})
                })

    }

    static step7(req,res,next) {
        let user = req.decoded.id;
        let { 
            ERC_20, 
            link_relevant_blockchain,  
        } = req.body;
        Project.updateOne({user}, {ERC_20, link_relevant_blockchain, next_step: 8})
            .then(() => {
                res.status(201).json({message: 'Project has been updated'})
            })
            .catch(next)
    };

    static step8(req,res,next) {
        let user = req.decoded.id;
        let { 
            publicy,
            fullname_title, 
            anti_phising_code, 
            anything_add, 
        } = req.body;
        Project.updateOne({user}, {publicy, fullname_title, anti_phising_code, anything_add, next_step: 0, status: "completed"})
            .then(() => {
                res.status(201).json({message: 'Project has been updated'})
            })
            .catch(next);
    };

    static readMyProject(req,res,next) {
        let user = req.decoded.id;
        Project.find({user})
            .then(projects => {
                res.status(200).json({projects, status: 200});
            }) 
            .catch(next)
    };

    static getMyProjectNotCompleted(req,res,next) {
        let user = req.decoded.id;
        console.log(req.decoded)
        Project.findOne({user, status: "not_completed"})
            .then(project => {
                res.status(200).json({project, status: 200});
            })
            .catch(next);
    };


};

module.exports = LaunchpadController;