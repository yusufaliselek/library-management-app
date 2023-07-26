import axios from 'axios';
const baseURL = 'http://localhost:5000/';
export class ConfigApi {
    public static LibraryApi() {
        return axios.create({
            baseURL: baseURL,
        });
    }
}