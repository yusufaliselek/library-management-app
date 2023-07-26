import axios from 'axios';
const baseURL = 'https://library-management-backend-wyt2.onrender.com/';
export class ConfigApi {
    public static LibraryApi() {
        return axios.create({
            baseURL: baseURL,
        });
    }
}
