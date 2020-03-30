const mongoose = require('mongoose');
const { hashPass } = require('../../helpers/hashing');
const passwordSchema = new mongoose.Schema({
    password: {
        type: String,
        validate: {
            validator: function (value) {
                if (value.length < 6) {
                    return false;
                }else {
                    return true;
                }
            }, message: (props) => `New Password length must be larger or equal than 6`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

passwordSchema.pre('save', function(next) {
    let pass = hashPass(this.password);
    this.password = pass;
    next();
})

const password = mongoose.model('Password', passwordSchema)

module.exports = password;
