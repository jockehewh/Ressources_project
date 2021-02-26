import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
    title: {type: String, required: true},
    abstract: {type: String},
    location: {type: String},
    address: {type: String},
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    promoter: {type: String},
    phone: {type: Number, length: 10},
    email: {type: String},
    thumbnail: {type: String, default: "uploads/events/event.jpg"},
    link: {type: String, unique: true},
    price: {type: Number, default: 0},
    start_datetime: {type: Date},
    end_datetime: {type: Date},
    partner: {type: Schema.Types.ObjectId, ref: 'Partner', required: true},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now()},
    updated_by: {type: Schema.Types.ObjectId, ref: 'User'},
    updated_at: {type: Date},
});

const eventModel = model('Event', EventSchema);

module.export = {eventModel}