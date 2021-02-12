import Partner from "../models/Partner";
import fs from 'fs';

export default class PartnerController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let partners = await Partner.find()
                .populate('city')
                .select('-__v');
            body = {partners};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner list',
                message: e.message || 'An error is occured into partner list',
            }
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let partner = await Partner.findById(id)
                .populate('city')
                .select('-__v');
            body = {partner};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner details',
                message: e.message || 'An error is occured into partner details',
            }
        }
        return res.status(status).json(body);
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let partner = await Partner.create(req.body);
            body={partner};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner create',
                message: e.message || 'An error is occured into partner create',
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
            let partner = await Partner.findByIdAndUpdate(id, req.body, {new: true})
                .populate('city')
                .select('-__v');

            if(stock_thumbnail !== undefined){
                if(fs.existsSync(`./${partner.thumbnail}`)){
                    await fs.unlinkSync(`./${partner.thumbnail}`);
                }
    
                partner.thumbnail = stock_thumbnail;
                partner.save();
            }    

            body = {partner};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner update',
                message: e.message || 'An error is occured into partner update',
            }
        }
        return res.status(status).json(body);
    }

    static async updateThumbnail(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let partner = await Partner.findById(id).select('thumbnail');

            if(fs.existsSync(`./${partner.thumbnail}`)){
                await fs.unlinkSync(`./${partner.thumbnail}`);
            }
            partner.thumbnail = req.body.thumbnail;
            await partner.save();
            body = {partner};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner_thumbnail update',
                message: e.message || 'An error is occured into partner_thumbnail update',
            }
        }
        return res.status(status).json(body);
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let partner = await Partner.findByIdAndDelete(id);
            if(fs.existsSync(`./${partner.thumbnail}`)){
                await fs.unlinkSync(`./${partner.thumbnail}`);
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner remove',
                message: e.message || 'An error is occured into partner remove',
            }
        }
        return res.status(status).json(body);
    }
}
