import axios from 'axios';

export default class Web_articleService{

    static async list(){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/webarticles`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }
    
    
    static async list_by_partner(partner_id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/webarticles/by/${partner_id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async details(id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/webarticles/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async create(body){
        return await axios.post(`${process.env.REACT_APP_HOST_API}/webarticles`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async update(id, body){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/webarticles/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async updateThumbnail(id, body){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/webarticles/${id}/thumbnail`, body,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async delete(id){
        return await axios.delete(`${process.env.REACT_APP_HOST_API}/webarticles${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }
}
