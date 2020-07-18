const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    mainPicture: {
        type: String,
        required: true
    },
    images: [String],
    datetime: {
        type: String,
        required: true
    }
});

const Place = mongoose.model('Place', newSchema);
module.exports = Place;