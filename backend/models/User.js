const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const newSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        validate: {
            validator: async function (username) {
                if (!this.isModified('username')) return true;

                const user = await User.findOne({username});
                if (user) throw new Error(`Username : ${username} уже зарегестрирован`)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                if (this.password.length < 4) {
                    throw new Error('Password length < 4')
                }
            }
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String,
        required: true
    }
});

newSchema.methods.generationToken = function () {
    this.token = nanoid()
};

newSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

newSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next()
});

newSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret
    }
});

const User = mongoose.model('User', newSchema);
module.exports = User;