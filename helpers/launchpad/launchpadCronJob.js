const cron = require('node-cron')
const ProjectRequest = require('../../models/launchpad/ProjectRequest')
const UserNotification = require('../')
function launchpadStatusCheck () {
  cron.schedule('* 1 * * *',  async () => {
    ProjectRequest.find({ status: true })
    .then(data => {
      data.forEach(project => {
        const today = new Date()
        if (project.ieo_end_time <= today) {

        }
      })
    })
  })

};



module.exports = launchpadStatusCheck
