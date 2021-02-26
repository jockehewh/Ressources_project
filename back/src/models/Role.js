const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
    code: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
});

const roleModel =  model('Role', RoleSchema);

module.exports = {roleModel}