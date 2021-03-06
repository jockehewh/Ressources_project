import Web_site from "../models/Web_site";
import fs from "fs";

export default class Web_siteController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let sites = await Web_site.find()
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {sites};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_sites list',
                message: e.message || 'An error is occured into web_sites list',
            }
        }
        return res.status(status).json(body);
    }

    static async list_by_partner(req, res){
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let sites = await Web_site.find({'partner': partner_id})
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {sites};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_sites list_by_partner',
                message: e.message || 'An error is occured into web_sites list_by_partner',
            }
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let site = await Web_site.findById(id)
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {site};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_site details',
                message: e.message || 'An error is occured into web_site details',
            }
        }
        return res.status(status).json(body);
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let site = await Web_site.create(req.body);
            body={site};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_site create',
                message: e.message || 'An error is occured into web_site create',
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
            let site = await Web_site.findByIdAndUpdate(id, req.body, {new: true})
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {site};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_site update',
                message: e.message || 'An error is occured into web_site update',
            }
        }
        return res.status(status).json(body);
    }

    static async updateThumbnail(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let site = await Web_site.findById(id).select('thumbnail');    

            if(fs.existsSync(`./${site.thumbnail}`)){
                await fs.unlinkSync(`./${site.thumbnail}`);
            }
            site.thumbnail = req.body.thumbnail;
            await site.save()
            body = {site};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_site_thumbnail update',
                message: e.message || 'An error is occured into web_site_thumbnail update',
            }
        }
        return res.status(status).json(body);
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let site = await Web_site.findByIdAndDelete(id);
            if(fs.existsSync(`./${site.thumbnail}`)){
                await fs.unlinkSync(`./${site.thumbnail}`);
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_site remove',
                message: e.message || 'An error is occured into web_site remove',
            }
        }
        return res.status(status).json(body);
    }
}
