const Project = require('../../models/launchpad/project');

class LaunchpadController {


    static createApplyProject(req,res,next) {
        let {  } = req.body;

        Project.create({})
            .then(trade => {
                
            })
            .catch(next)

    };

};

module.exports = LaunchpadController;