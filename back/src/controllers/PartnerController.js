const {partnerModel} = require("../models/Partner");
const fs = require('fs');

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

const PartnerController = {
    list: async (req, res)=>{
        let status = 200;
        let body = {};
        try{
            let partners = await partnerModel.find()
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
    },
    details: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let partner = await partnerModel.findById(id)
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
    },
    store: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let partner = await partnerModel.create(req.body);
            body={partner};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Partner create',
                message: e.message || 'An error is occured into partner create',
            }
        }
        return res.status(status).json(body);
    },
    update: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let stock_thumbnail = req.body.thumbnail;
            delete req.body.thumbnail;
            let {id} = req.params;
            let partner = await partnerModel.findByIdAndUpdate(id, req.body, {new: true})
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
    },
    updateThumbnail: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let partner = await partnerModel.findById(id).select('thumbnail');

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
    },
    remove: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let partner = await partnerModel.findByIdAndDelete(id);
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

module.exports = {PartnerController}