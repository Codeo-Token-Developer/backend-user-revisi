const User = require('./models/AuthSide/user.model')

function checkVer(id) {
    User.findOne({_id: id, verification: true})
        .then(user => {
            if (user) {
                
            }else {
                return User.deleteOne({_id: id})
                    .then(() => {
                        //fungsi email
                    })
            }
        })
};


//ABIS create

//id = '12345'

setInterval(checkVer(id), 100000000)