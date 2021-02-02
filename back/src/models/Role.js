import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    code: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
});

export default model('Role', RoleSchema);
