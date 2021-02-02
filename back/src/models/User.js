import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    thumbnail: {type: String, default: "uploads/users/user.png"},
    role_id: {type: Schema.Types.ObjectId, ref: 'Role'},
    partner_id: {type: Schema.Types.ObjectId, ref: 'Partner', required: true},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, default: Date.now()},
    updated_by: {type: Schema.Types.ObjectId, ref: 'Users'},
    updated_at: {type: Date},
});

export default model('User', UserSchema);
