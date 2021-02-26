const {web_siteModel} = require("../models/Web_site");
const fs = require("fs");
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
const Web_siteController = {
    list: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let sites = await web_siteModel.find()
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
    },
    list_by_partner: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let sites = await web_siteModel.find({'partner': partner_id})
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
    },
    details: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let site = await web_siteModel.findById(id)
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
    },
    store: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let site = await web_siteModel.create(req.body);
            body={site};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_site create',
                message: e.message || 'An error is occured into web_site create',
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
            let site = await web_siteModel.findByIdAndUpdate(id, req.body, {new: true})
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
    },
    updateThumbnail: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let site = await web_siteModel.findById(id).select('thumbnail');    

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
    },
    remove: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let site = await web_siteModel.findByIdAndDelete(id);
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
module.exports = {Web_siteController}