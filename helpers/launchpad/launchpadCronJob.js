const cron = require('node-cron')
const Project = require('../../models/launchpad/SupplyProject')
const UserNotification = require('../../models/Other/notification')
function launchpadStatusCheck () {
  cron.schedule('* 1 * * *',  async () => {
    Project.find({ status: true })
    .then(data => {
      data.forEach(project => {
        const today = new Date()
        if (project.ieo_end_time <= today || project.current_supply === project.session_supply) {
          Project.updateOne({ _id: project.id }, { status: false })
          .then(() => {
            UserNotification.create({ user: project.user, text: 'Your Project has ended. you will be contacted by admin soon.' })
            .then(() => {
              console.log('Project has finished.')
            })
          })
        }
      })
    })
  })

};



module.exports = launchpadStatusCheck
