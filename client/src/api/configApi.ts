import axios from 'axios';
const baseURL = 'https://library-management-backend-wyt2.onrender.com/';
//const baseURL = 'http://localhost:5000/';
export class ConfigApi {
    public static LibraryApi() {
        return axios.create({
            baseURL: baseURL,
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });
    }
}
