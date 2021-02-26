import User from "../models/User";
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';

export default class UserController{

    static async auth(req, res){
        let status = 200;
        let body = {};

        try{
            let {email, password} = req.body;
            let user = await User.findOne({'email': email}).select('-__v');
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
    }

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let users = await User.find()
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
    }

    static async list_by_partner(req, res){
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let users = await User.find({'partner': partner_id})
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
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let user = await User.findById(id)
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
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let user = await User.create(req.body);
            body={user};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User create',
                message: e.message || 'An error is occured into user create',
            }
        }
        return res.status(status).json(body);
    }

    static async update(req, res){
        let status = 200;
        let body = {};

        try{
            delete req.body.thumbnail;
            let {id} = req.params;
            let user = await User.findByIdAndUpdate(id, req.body, {new: true})
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
    }

    static async updateThumbnail(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let user = await User.findById(id).select('thumbnail');

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
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let user = await User.findByIdAndDelete(id);
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
