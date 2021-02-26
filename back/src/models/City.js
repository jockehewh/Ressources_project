const { Schema, model } = require('mongoose');

const CitySchema = new Schema({
    nom: {type: String, required: true},
    code: {type: String, required: true},
    codeDepartement: {type: String, required: true},
    codeRegion: {type: String, required: true},
    codePostaux: [
        {type: String, required: true}
    ],
});

const cityModel = model('City', CitySchema)

module.exports = {cityModel}
