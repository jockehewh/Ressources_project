const {userModel} = require ("../models/User");
const jsonwebtoken = require ('jsonwebtoken');
const fs = require ('fs');

const UserController = {
    auth: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {email, password} = req.body;
            let user = await userModel.findOne({'email': email}).select('-__v');
            if(user && password === user.password){
                let {JWT_SECRET} = process.env;

                let token = jsonwebtoken.sign({sub: user._id}, JWT_SECRET);
                body = {user, token};
            }else{
                status = 401;
                new Error('Unauthorized');
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User authentication',
                message: e.message || 'An error is occured into user authentification',
            }
        }
        return res.status(status).json(body);
    },
    list: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let users = await userModel.find()
                .populate('role')
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v -password');
            body = {users};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Users list',
                message: e.message || 'An error is occured into users list',
            }
        }
        return res.status(status).json(body);
    },
    list_by_partner: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let users = await userModel.find({'partner': partner_id})
                .populate('role')
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v -password');
            body = {users};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User list_by_partner',
                message: e.message || 'An error is occured into user list_by_partner',
            }
        }
        return res.status(status).json(body);
    },
    details: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let user = await userModel.findById(id)
                .populate('role')
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {user};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User details',
                message: e.message || 'An error is occured into user details',
            }
        }
        return res.status(status).json(body);
    },
    store: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let user = await userModel.create(req.body);
            body={user};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User create',
                message: e.message || 'An error is occured into user create',
            }
        }
        return res.status(status).json(body);
    },
    update: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            delete req.body.thumbnail;
            let {id} = req.params;
            let user = await userModel.findByIdAndUpdate(id, req.body, {new: true})
                .populate('role')
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v -password');
            body = {user};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User update',
                message: e.message || 'An error is occured into user update',
            }
        }
        return res.status(status).json(body);
    },
    updateThumbnail: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let user = await userModel.findById(id).select('thumbnail');

            if(fs.existsSync(`./${user.thumbnail}`)){
                await fs.unlinkSync(`./${user.thumbnail}`);
            }
            user.thumbnail = req.body.thumbnail;
            await user.save();
            body = {user};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User_thumbnail update',
                message: e.message || 'An error is occured into user_thumbnail update',
            }
        }
        return res.status(status).json(body);
    },
    remove: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let user = await userModel.findByIdAndDelete(id);
            if(fs.existsSync(`./${user.thumbnail}`)){
                await fs.unlinkSync(`./${user.thumbnail}`);
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User remove',
                message: e.message || 'An error is occured into user remove',
            }
        }
        return res.status(status).json(body);
    }
}
module.exports = {UserController}
