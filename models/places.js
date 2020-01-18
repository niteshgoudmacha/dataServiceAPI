const mongoose = require('mongoose');
const { Schema } = mongoose;
const touristPlacesSchema = require('./touristPlaces');

const placeSchema =  new Schema({
    state: String,
    location: String,
    districts: [touristPlacesSchema],
    budget: Number,
    month: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('places', placeSchema);;
