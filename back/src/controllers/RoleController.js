const {roleModel} = require("../models/Role");

/* 
{
    list: async (req, res)=>{},
    details: async (req, res)=>{},
    store: async (req, res)=>{},
    update: async (req, res)=>{},
    updateThumbnail: async (req, res)=>{},
    remove: async (req, res)=>{}
}
 */
const RoleController = {
    list: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let roles = await roleModel.find().select('-__v');
            body = {roles};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role list',
                message: e.message || 'An error is occured into role list',
            }
        }
        return res.status(status).json(body);
    },
    details: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let role = await roleModel.findById(id).select('-__v');
            body = {role};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role details',
                message: e.message || 'An error is occured into role details',
            }
        }
        return res.status(status).json(body);
    },
    store: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let role = await roleModel.create(req.body);
            body={role};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role create',
                message: e.message || 'An error is occured into role create',
            }
        }
        return res.status(status).json(body);
    },
    update: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let role = await roleModel.findByIdAndUpdate(id, req.body, {new: true})
                .select('-__v');
            body = {role};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role update',
                message: e.message || 'An error is occured into role update',
            }
        }
        return res.status(status).json(body);
    },
    remove: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            await roleModel.findByIdAndDelete(id);
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role remove',
                message: e.message || 'An error is occured into role remove',
            }
        }
        return res.status(status).json(body);
    }
}

module.exports = {RoleController}