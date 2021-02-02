import Event from "../models/Event";
import fs from 'fs';

export default class EventController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let events = await Event.find().select('-__v');
            body = {events};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Events list',
                message: e.message || 'An error is occured into events list',
            }
        }
        return res.status(status).json(body);
    }

    static async list_by_partner(req, res){
        let status = 200;
        let body = {};

        try{
            let {partner_id} = req.params;
            let events = await Event.find({'partner_id': partner_id}).select('-__v');
            body = {events};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Events list_by_partner',
                message: e.message || 'An error is occured into zvents list_by_partner',
            }
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let event = await Event.findById(id).select('-__v');
            body = {event};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Event details',
                message: e.message || 'An error is occured into event details',
            }
        }
        return res.status(status).json(body);
    }

    static async store(req, res){
        let status = 200;
        let body = {};

        try{
            let event = await Event.create(req.body);
            body={event};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Event create',
                message: e.message || 'An error is occured into event create',
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
            let event = await Event.findByIdAndUpdate(id, req.body, {new: true})
                .select('-__v');

            if(stock_thumbnail !== undefined){
                if(fs.existsSync(`./${event.thumbnail}`)){
                    await fs.unlinkSync(`./${event.thumbnail}`);
                }

                event.thumbnail = stock_thumbnail;
                event.save();
            }
            
            body = {event};

        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Event update',
                message: e.message || 'An error is occured into event update',
            }
        }
        return res.status(status).json(body);
    }

    static async remove(req, res){
        let status = 200;
        let body = {};

        try{
            let {id} = req.params;
            let event = await Event.findByIdAndDelete(id);
            if(fs.existsSync(`./${event.thumbnail}`)){
                await fs.unlinkSync(`./${event.thumbnail}`);
            }
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Event remove',
                message: e.message || 'An error is occured into event remove',
            }
        }
        return res.status(status).json(body);
    }
}