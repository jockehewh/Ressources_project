import { Schema, model } from 'mongoose';

const PartnerSchema = new Schema({
    name: {type: String, required: true},
    thumbnail: {type :String, default: "uploads/partners/partner.png"},
    website: {type :String, unique: true},
    phone: {type: Number, length: 10},
    email: {type: String},
    address: {type: String},
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    subscription: {type: Boolean},
    created_at: {type: Date, default: Date.now()},
});

export default model('Partner', PartnerSchema);
