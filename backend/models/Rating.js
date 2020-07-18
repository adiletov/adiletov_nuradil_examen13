const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    qualityToFood: Number,
    serviceQuality: Number,
    interior: Number,
    comment: String,
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    placeId : {
        type: Schema.Types.ObjectID,
        ref: 'Place',
        required: true
    },
    datetime: {
        type: Object,
        required: true
    }
});

const Rating = mongoose.model('Rating', newSchema);
module.exports = Rating;