import { Schema, model } from 'mongoose';

const Web_siteSchema = new Schema({
    title: {type: String, required: true},
    abstract: {type: String},
    thumbnail: {type: String, default: "uploads/web_sites/web_site.png"},
    link: {type: String, unique: true, required: true},
    organization: {type: String},
    tags: [
        {type: String}
    ],
    partner_id: {type: Schema.Types.ObjectId, ref: 'Partner', required: true},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now()},
    updated_by: {type: Schema.Types.ObjectId, ref: 'Users'},
    updated_at: {type: Date},
});

export default model('Web_site', Web_siteSchema);

