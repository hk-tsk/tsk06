import { IClaps } from "src/Entities/Interfaces";
import { ApiException } from "./ApiException";
import BaseApi from "./BaseApi";

export default class ClapsApi extends BaseApi {
  public async GetClaps(itemType: string) {
    const response = await this.get("/Claps?itemType=" + itemType);

    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }

  public async ApplyClaps(
    itemId: number,
    itemType: string,
    added: boolean,
    user: string
  ) {
    const claps: IClaps = {
      Added: added,
      ClientInfo: "",
      ItemId: itemId,
      ItemType: itemType,
      User: user
    };

   // const requestInfo = window.navigator.userAgent;

    const response = await this.post("/Claps", claps);

    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }
}
