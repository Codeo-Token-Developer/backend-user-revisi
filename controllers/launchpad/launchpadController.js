const ProjectRequest = require('../../models/launchpad/ProjectRequest');

class LaunchpadController {

    static createApplyProject(req, res, next) {
        let {
            full_name,
            email,
            position,
            other_position,
            project_name,
            coin_full_name,
            coinSymbolUrl,
            whitepaperUrl,
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
            telegram,
            kakao,
            twitter,
            instagram,
            project_introduction,
        } = req.body;

        ProjectRequest.create({
                full_name,
                email,
                position,
                other_position,
                project_name,
                coin_full_name,
                coin_symbol: coinSymbolUrl,
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
                whitepaper: whitepaperUrl,
                telegram,
                kakao,
                twitter,
                instagram,
                project_introduction,
                user: req.decoded.id
            })
            .then(trade => {
                res.status(201).json({
                    trade,
                    message: "Project Created, Please wait for Admin Approval.",
                    status: 201
                })
            })
            .catch(next)
    };

};

module.exports = LaunchpadController;