const CMS = require('../../models/Other/cms.model');

class CmsController {

    static readAll(req,res,next) {
        CMS.find({})
            .then(cms => {
                res.status(200).json({cms, status: 200})
            })
            .catch(next)
    }

};

module.exports = CmsController;