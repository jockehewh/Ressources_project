const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    thumbnail: {type: String, default: "uploads/users/user.png"},
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    partner: {type: Schema.Types.ObjectId, ref: 'Partner', required: true},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now()},
    updated_by: {type: Schema.Types.ObjectId, ref: 'User'},
    updated_at: {type: Date},
});

const userModel = model('User', UserSchema);

module.exports = {userModel}