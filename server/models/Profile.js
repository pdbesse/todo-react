const {Schema} = require('mongoose');

const profileSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true
        }
    },
    {
        toJSON: { virtuals:true, getters: true },
        id: false
    }
);

module.exports = profileSchema;