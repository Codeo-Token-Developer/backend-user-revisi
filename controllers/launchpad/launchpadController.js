const Project = require('../../models/launchpad/project');
const LaunchpadProduct = require('../../models/launchpad/product');

class LaunchpadController {

    static createApplyProject(req, res, next) {
        let {
            full_name,
            email,
            position,
            other_position,
            project_name,
            coin_full_name,
            coin_symbol,
            official_website,
            session_supply,
            quote_desc,
            pre_sales_price,
            timezone,
            short_desc,
            ieo_ratio,
            ieo_minimum,
            bonus,
            ieo_start_time,
            ieo_end_time,
            referral_reward,
            technology_fouCoinSymboltion,
            whitepaper,
            telegram,
            kakao,
            twitter,
            instagram,
            project_introduction,
        } = req.body;

        Project.create({
                full_name,
                email,
                position,
                other_position,
                project_name,
                coin_full_name,
                coin_symbol,
                official_website,
                session_supply,
                quote_desc,
                pre_sales_price,
                countdown,
                timezone,
                short_desc,
                ieo_ratio,
                ieo_minimum,
                bonus,
                ieo_start_time,
                ieo_end_time,
                referral_reward,
                technology_fouCoinSymboltion,
                whitepaper,
                telegram,
                kakao,
                twitter,
                instagram,
                project_introduction,
            })
            .then(trade => {
                res.status(202).json({
                    trade,
                    message: "Success create project, wait for admin approval.",
                    status: 202
                })
            })
            .catch(next)
    };

};

module.exports = LaunchpadController;