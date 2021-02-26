import Role from "../models/Role";

export default class RoleController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let roles = await Role.find().select('-__v');
            body = {roles};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role list',
                message: e.message || 'An error is occured into role list',
            }
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let role = await Role.findById(id).select('-__v');
            body = {role};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role details',
                message: e.message || 'An error is occured into role details',
            }
        }
        return res.status(status).json(body);
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let role = await Role.create(req.body);
            body={role};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Role create',
                message: e.message || 'An error is occured into role create',
            }
        }
        return res.status(status).json(body);
    }

    static async update(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let role = await Role.findByIdAndUpdate(id, req.body, {new: true})
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
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            await Role.findByIdAndDelete(id);
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
