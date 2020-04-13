import { ApiException } from "./ApiException";
import BaseApi from "./BaseApi";

export default class ProductApi extends BaseApi {
  public async GetProducts() {
    const response = await this.get("/Product");
    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }
}
