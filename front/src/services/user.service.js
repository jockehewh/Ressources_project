import axios from 'axios';

export default class UserService{

    /**
     * Auth user and return token
     * @param body
     * @returns {Promise<AxiosResponse<T>>}
     */
    static async auth(body){
        return await axios.post(`${process.env.REACT_APP_HOST_API}/users/auth`, body);
    }

    static async list(){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/users`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async list_by_partner(partner_id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/users/by/${partner_id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async details(id){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/users/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async update(id, body){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/users/${id}`, body,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }

    static async updateThumbnail(id, body){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/users/${id}/thumbnail`, body,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async create(body){
        return await axios.post(`${process.env.REACT_APP_HOST_API}/users`, body,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async delete(id){
        return await axios.put(`${process.env.REACT_APP_HOST_API}/users/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        });
    }
}
