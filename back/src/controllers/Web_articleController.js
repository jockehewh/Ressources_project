import Web_article from "../models/Web_article";
import fs from "fs";

export default class Web_articleController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let articles = await Web_article.find().select('-__v');
            body = {articles};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_articles list',
                message: e.message || 'An error is occured into web_articles list',
            }
        }
        return res.status(status).json(body);
    }

    static async list_by_partner(req, res){
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let articles = await Web_article.find({'partner_id': partner_id}).select('-__v');
            body = {articles};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_articles list_by_partner',
                message: e.message || 'An error is occured into web_articles list_by_partner',
            }
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let article = await Web_article.findById(id).select('-__v');
            body = {article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article details',
                message: e.message || 'An error is occured into web_article details',
            }
        }
        return res.status(status).json(body);
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let article = await Web_article.create(req.body);
            body={article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article create',
                message: e.message || 'An error is occured into web_article create',
            }
        }
        return res.status(status).json(body);
    }

    static async update(req, res){
        let status = 200;
        let body = {};

        try{
            let stock_thumbnail = req.body.thumbnail;
            delete req.body.thumbnail;
            let {id} = req.params;
            let article = await Web_article.findByIdAndUpdate(id, req.body, {new: true})
                .select('-__v');

            if(stock_thumbnail !== undefined){    
                if(fs.existsSync(`./${article.thumbnail}`)){
                    await fs.unlinkSync(`./${article.thumbnail}`);
                }

                article.thumbnail = stock_thumbnail;
                article.save();
            }

            body = {article};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Web_article update',
                message: e.message || 'An error is occured into web_article update',
            }
        }
        return res.status(status).json(body);
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let article = await Web_article.findByIdAndDelete(id);
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
