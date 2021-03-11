import axios from 'axios';

export default class Api {
    constructor() {
        this.client = null;
        this.api_url = 'http://127.0.0.1:8000';
    }
    init = () => {
        var headers = {
            'content-type': "application/json",
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    generateShortUrl = (params) => {
        return this.init().post("/api/urlService/",{ params });
    };
}