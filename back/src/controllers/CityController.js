import City from "../models/City";

export default class CityController{

    static async list(req, res){
        let status = 200;
        let body = {};

        try{
            let cities = await City.find().select('-__v');
            body = {cities};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'City list',
                message: e.message || 'An error is occured into city list',
            }
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try{
            let {codePostal} = req.params;
            let city = await City.findOne({codesPostaux: codePostal}).select('-__v');
            body = {city};
        }catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'City details',
                message: e.message || 'An error is occured into city details',
            }
        }
        return res.status(status).json(body);
    }
}
