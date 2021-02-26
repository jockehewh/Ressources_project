const {web_articleModel} = require("../models/Web_article");
const fs = require("fs");

const Web_articleController = {
    list: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let articles = await web_articleModel.find()
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {articles};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_articles list',
                message: e.message || 'An error is occured into web_articles list',
            }
        }
        return res.status(status).json(body);
    },
    list_by_partner: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let articles = await web_articleModel.find({'partner': partner_id})
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {articles};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_articles list_by_partner',
                message: e.message || 'An error is occured into web_articles list_by_partner',
            }
        }
        return res.status(status).json(body);
    },
    details: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let article = await web_articleModel.findById(id)
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article details',
                message: e.message || 'An error is occured into web_article details',
            }
        }
        return res.status(status).json(body);
    },
    store: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let article = await web_articleModel.create(req.body);
            body={article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article create',
                message: e.message || 'An error is occured into web_article create',
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
            let article = await web_articleModel.findByIdAndUpdate(id, req.body, {new: true})
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article update',
                message: e.message || 'An error is occured into web_article update',
            }
        }
        return res.status(status).json(body);
    },
    updateThumbnail: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let article = await web_articleModel.findById(id).select('thumbnail');    

            if(fs.existsSync(`./${article.thumbnail}`)){
                await fs.unlinkSync(`./${article.thumbnail}`);
            }
            article.thumbnail = req.body.thumbnail;
            await article.save()
            body = {article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article_thumbnail update',
                message: e.message || 'An error is occured into web_article_thumbnail update',
            }
        }
        return res.status(status).json(body);
    },
    remove: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let article = await web_articleModel.findByIdAndDelete(id);
            if(fs.existsSync(`./${article.thumbnail}`)){
                await fs.unlinkSync(`./${article.thumbnail}`);
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article remove',
                message: e.message || 'An error is occured into web_article remove',
            }
        }
        return res.status(status).json(body);
    }
}
module.exports = {Web_articleController}