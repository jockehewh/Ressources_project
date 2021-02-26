import { Schema, model } from 'mongoose';

const Web_articleSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, unique: true, required: true},
    author: {type: String, required: true},
    publication_date: {type: Date},
    thumbnail: {type: String, default: "uploads/web_sites/web_article.jpg"},
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

export default model('Web_article', Web_articleSchema);
