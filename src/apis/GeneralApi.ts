import { ApiException } from "./ApiException";
import BaseApi from "./BaseApi";

export default class GeneralApi extends BaseApi {
  public async SendContactUsOpinion(name: string, email: string, desc: string) {
    const response = await this.post("/UserMessage", {
      Desc: desc,
      Email: email,
      Name: name
    });

    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }
}
