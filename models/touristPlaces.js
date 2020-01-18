const mongoose = require('mongoose');
const { Schema } = mongoose;

const touristPlacesSchema =  new Schema({
    district: String,
    places: [{
        name: String,
        image: String
    }]
});

module.exports = touristPlacesSchema;
