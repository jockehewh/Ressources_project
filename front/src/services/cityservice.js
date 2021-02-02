import axios from 'axios';

export default class CityService{

    static async list(){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/cities`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

    static async details(codePostal){
        return await axios.get(`${process.env.REACT_APP_HOST_API}/cities/${codePostal}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ThpToken')}`
            }
        });
    }

}
