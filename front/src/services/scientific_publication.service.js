import axios from 'axios';

export default class Scientific_publicationService{

    static async list(){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/scientificpublications`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    
    static async list_by_partner(partner_id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/scientificpublications/by/${partner_id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async details(id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/scientificpublications/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async create(body){
        return await axios.post(`${process.env.REACT_APP_HOST_API}/scientificpublications`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async update(id, body){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/scientificpublications/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async delete(id){
        return await axios.delete(`${process.env.REACT_APP_HOST_API}/scientificpublications/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }
}
