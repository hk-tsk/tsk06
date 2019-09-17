import { ApiException } from './ApiException';
import BaseApi from './BaseApi';

export default class PagesApi extends BaseApi {

    public async GetCourses() {
        // this.getAccessToken();

        // response = await this.get("/Courses.json");
        const response = await this.get("/Course");
        if (response instanceof ApiException) {
            return response
        } else {
            return response.data;
        }
    }

    public async GetCategories(name: string) {
        const response = await this.get("/Course/" + name + "/Category");
        if (response instanceof ApiException) {
            return response
        } else {
            return response.data;
        }

    }

    public GetImageUrl(name: string, category: string = "shared") {
        return this.baseUrl + "/Images/" + category + "/" + name;
    }

    public async GetImages(name: string, category: string = "shared") {
        const response = await this.get("/Images/" + category + "/" + name);
        if (response instanceof ApiException) {
            return response
        } else {
            return response.data;
        }
    }

    public async GetContent(name: string, category: string) {
        const response = await this.get("/Content/" + name + "/" + category);
        if (response instanceof ApiException) {
            return response
        } else {
            return response.data;
        }

    }

}