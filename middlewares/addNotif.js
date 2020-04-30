const notif = require('../../models/Other/notification');

function addnotif(user) {
    let Io = req.Io;
    let user = req.decoded.id;
    let text = req.body;
    notif.create({text=message, user})
    .then(notifs => {
        Io.emit('user-notif', notifs);
        next();
      })
      .catch(next);
}

module.exports = addnotif