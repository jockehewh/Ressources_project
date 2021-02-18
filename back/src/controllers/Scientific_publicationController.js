import Scientific_publication from "../models/Scientific_publication";
import fs from "fs"

export default class Scientific_publicationController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let publications = await Scientific_publication.find()
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
    }

    static async list_by_partner(req, res){
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let publications = await Scientific_publication.find({'partner': partner_id})
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
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let publication = await Scientific_publication.findById(id)
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
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let publication = await Scientific_publication.create(req.body);
            body={publication};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Scientific_publication create',
                message: e.message || 'An error is occured into scientific_publication create',
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
            let publication = await Scientific_publication.findByIdAndUpdate(id, req.body, {new: true})
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
    }

    static async updateThumbnail(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let publication = await Scientific_publication.findById(id).select('thumbnail');    

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
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let publication = await Scientific_publication.findByIdAndDelete(id);
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
