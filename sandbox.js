// const User = require('./models/AuthSide/user.model')

// function checkVer(id) {
//     User.findOne({_id: id, verification: true})
//         .then(user => {
//             if (user) {
                
//             }else {
//                 return User.deleteOne({_id: id})
//                     .then(() => {
//                         //fungsi email
//                     })
//             }
//         })
// };


// //ABIS create

// //id = '12345'

// setInterval(checkVer(id), 100000000)


const gerbong = ( penumpang, slot_kursi ) => {
    let kursi = []
    let temp = []
    for (let i in penumpang) {
        temp[i] = penumpang[i]
    }
    return temp
}
console.log(gerbong(['a','b','c','d'],2))