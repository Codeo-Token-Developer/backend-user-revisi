const mongoose = require('mongoose');
const { hashPass } = require('../../helpers/hashing');


const userSchema = new mongoose.Schema ({
    full_name: {
        type: String,
        required: [true, 'Full name cannot be empty'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username cannot be empty'],
        trim: true,
        validate: {
            validator: function (value) {
                return this.model('User').findOne({username: value})
                    .then(function(user) {
                        if (user) {
                            return false;
                        }else {
                            return true;
                        }
                    })
            },message: (props) => `${props.value} already taken, please choose another`
        }
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        trim: true,
        validate: [
            {
                validator: function (value) {
                    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return email.test(value)
                },
                message: props => `${props.value} is not valid email, please fill email correctly`
            },
            {
                validator: function (value) {
                    return this.model('User').findOne({email: value})
                        .then(function (email) {
                            if (email) {
                                return false
                            }else {
                                return true;
                            }
                        })
                },
                message: props => `${props.value} already taken, please take another one`
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        validate: {
            validator: function (value) {
                if (value.length < 6) {
                    return false;
                }else {
                    return true;
                }
            }, message: (props) => `Password length must be larger or equal than 6`
        }
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    approval_verified: {
        type: Boolean,
        default: false
    },
    verification: {
        type: Boolean,
        default: false
    },
    ref: {
        type: String
    },
    avatar: {
        type: String,
    },
    id_country: {
        type: String,
    },
    referral_address: {
        type: String,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
}, {versionKey: false, timestamps: { createdAt: 'created_at' }})


userSchema.pre('save', function (next) {
        let pass = hashPass(this.password);
        this.password = pass;
        next();
})


const user = mongoose.model('User', userSchema);

module.exports = user;