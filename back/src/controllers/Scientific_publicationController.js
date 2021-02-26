const {scientific_publicationModel} = require("../models/Scientific_publication");
const fs = require("fs")
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
const Scientific_publicationController = {
    list: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let publications = await scientific_publicationModel.find()
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {publications};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publications list',
                message: e.message || 'An error is occured into scientific_publications list',
            }
        }
        return res.status(status).json(body);
    },
    list_by_partner: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let publications = await scientific_publicationModel.find({'partner': partner_id})
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {publications};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publications list_by_partner',
                message: e.message || 'An error is occured into scientific_publications list_by_partner',
            }
        }
        return res.status(status).json(body);
    },
    details: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let publication = await scientific_publicationModel.findById(id)
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {publication};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publication details',
                message: e.message || 'An error is occured into scientific_publication details',
            }
        }
        return res.status(status).json(body);
    },
    store: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let publication = await scientific_publicationModel.create(req.body);
            body={publication};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publication create',
                message: e.message || 'An error is occured into scientific_publication create',
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
            let publication = await scientific_publicationModel.findByIdAndUpdate(id, req.body, {new: true})
                .populate('partner')
                .populate('created_by')
                .populate('updated_by')
                .select('-__v');
            body = {publication};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publication update',
                message: e.message || 'An error is occured into scientific_publication update',
            }
        }
        return res.status(status).json(body);
    },
    updateThumbnail: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let publication = await scientific_publicationModel.findById(id).select('thumbnail');    

            if(fs.existsSync(`./${publication.thumbnail}`)){
                await fs.unlinkSync(`./${publication.thumbnail}`);
            }
            publication.thumbnail = req.body.thumbnail;
            await publication.save()
            body = {publication};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publication_thumbnail update',
                message: e.message || 'An error is occured into scientific_publication_thumbnail update',
            }
        }
        return res.status(status).json(body);
    },
    remove: async (req, res)=>{
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let publication = await scientific_publicationModel.findByIdAndDelete(id);
            if(fs.existsSync(`./${publication.thumbnail}`)){
                await fs.unlinkSync(`./${publication.thumbnail}`);
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publication remove',
                message: e.message || 'An error is occured into scientific_publication remove',
            }
        }
        return res.status(status).json(body);
    }
}
module.exports = {Scientific_publicationController}
