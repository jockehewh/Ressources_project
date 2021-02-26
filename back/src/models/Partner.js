const { Schema, model } = require('mongoose');

const PartnerSchema = new Schema({
    name: {type: String, required: true},
    thumbnail: {type :String, default: "uploads/partners/partner.png"},
    website: {type :String, unique: true},
    phone: {type: Number, length: 10},
    email: {type: String},
    address: {type: String},
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    subscription: {type: Boolean},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now()},
    updated_by: {type: Schema.Types.ObjectId, ref: 'User'},
    updated_at: {type: Date},
});

const partnerModel = model('Partner', PartnerSchema);

module.exports= {partnerModel}
