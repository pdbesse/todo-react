const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const profileSchema = require('./Profile');

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        profile: profileSchema,
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true
    }
);

userSchema.virtual('connectionCount').get(function () {
    return this.connections.lenth;
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;