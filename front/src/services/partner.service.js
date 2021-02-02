import axios from 'axios';

export default class PartnerService{

    static async list(){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/partners`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async details(id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/partners/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async create(body){
        return await axios.post(`${process.env.REACT_APP_HOST_API}/partners`, body,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async update(id, body){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/partners/${id}`, body,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async delete(id){
        return await axios.delete(`${process.env.REACT_APP_HOST_API}/partners/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }
}
