import axios from 'axios'
import { resolve } from 'path';
import { reject } from 'q';
import { ApiException } from './ApiException';

export default class BaseApi {

    protected baseUrl ="https://localhost:44390/api/";
    
    private axiosObj = axios.create({
        baseURL: this.baseUrl,
    });

    public getAccessToken() {
         // tslint:disable-next-line: no-console
         console.log(45555)
        this.axiosObj.get("/Token")
            .then((response: any) => {
                // tslint:disable-next-line: no-console
                console.log(1, response)
            })
            .catch(error => {
                // tslint:disable-next-line: no-console
                console.log(2,error)
            });
        // tslint:disable-next-line: no-console
        console.log(444)
    }

    public get(url: string, data: any = {}) {
        return this.axiosObj.get(url)
            .then((response: any) => {
                return response;
            })
            .catch(error => {
                return new ApiException(error);
            });
    }

    public post(url: string, config: any) {

        this.axiosObj.post(url, config)
            .then((response: any) => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    }
}