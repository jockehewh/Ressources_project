const { Schema, model } = require('mongoose');

const Scientific_publicationSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, unique: true, required: true},
    thumbnail: {type: String, default: "uploads/scientific_publications/scientific_publication.png"},
    authors: [
        {type: String}
    ],
    publication_date: {type: Date},
    abstract: {type: String},
    tags: [
        {type: String}
    ],
    partner: {type: Schema.Types.ObjectId, ref: 'Partner', required: true},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now()},
    updated_by: {type: Schema.Types.ObjectId, ref: 'User'},
    updated_at: {type: Date},
    expiration_at: {type: Date},
});

const scientific_publicationModel model('Scientific_publication', Scientific_publicationSchema);

module.exports = {scientific_publicationModel}
