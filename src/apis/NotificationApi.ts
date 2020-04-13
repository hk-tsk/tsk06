import { ApiException } from "./ApiException";
import BaseApi from "./BaseApi";

export default class NotificationApi extends BaseApi {

    
  public async SendSubscription(pushSubscription: PushSubscription) {
    // subscritionId: string
    // tslint:disable-next-line: no-console
    console.log(" start api send subs", pushSubscription);

    const response = await this.post(`/subscription`, pushSubscription, {
      credentials: "omit",
      headers: {
        "content-type": "application/json;charset=UTF-8",
       // "sec-fetch-mode": "cors"
      },
      method: "GET",
      mode: "cors"
    });

    // tslint:disable-next-line: no-console
    console.log(" received api send subs", response);

    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }

  public async GetSubscription(subscriptionId: string) {
    // subscritionId: string
    // tslint:disable-next-line: no-console
    console.log(" start api get subs", subscriptionId);

    const response = await this.get(`/subscription/${subscriptionId}`, {
      credentials: "omit",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      mode: "cors"
    });

    // tslint:disable-next-line: no-console
    console.log(" received api get subs", response);

    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }

}
