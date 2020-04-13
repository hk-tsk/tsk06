import axios from "axios";
import { apiUrl } from "./apiConfig";
import { authService } from "./auth";

export default class BaseApi {
  protected baseUrl = apiUrl;

  private axiosObj = axios.create({
    baseURL: this.baseUrl
  });

  public get(url: string, config: {} = {}) {
    const currentConfig =config;// this.getCurrentConfig(config);
    // tslint:disable-next-line: no-console
    console.log(22222222222333, currentConfig);

    // const that = this;
    return this.axiosObj
      .get(url, currentConfig)
      .then((response: any) => {
        return response;
      })
      .catch(error => {
        return authService.HandleError(error);
      });
  }

  public async getAsync(url: string, config: {} = {}) {
    // const currentConfig = this.getCurrentConfig(config);
    const headers = this.SetHeaders(true);

    // tslint:disable-next-line: no-console
    console.log(33333333333333, headers);

   // const that = this;
    try {
      const response = await this.axiosObj.get(url);// , { headers });

      // tslint:disable-next-line: no-console
      console.log(333333333333888888, response);
      return response;
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log("async ", error.response);
      return authService.HandleError(error);
    }
  }

  public post(url: string, data: any, config: {} = {}) {
    const currentConfig = {};// this.getCurrentConfig(config);

    // const that = this;
    return this.axiosObj
      .post(url, data, currentConfig)
      .then((response: any) => {
        return response;
      })
      .catch(error => {
        return authService.HandleError(error);
      });
  }

  // private getCurrentConfig(config: any) {
  //   if (!authService.IsAuthorized) {
  //     // tslint:disable-next-line: no-console
  //     console.error("Not Authorized");
  //     return null;
  //   }
  //   const headers = this.SetHeaders();

  //   if (config !== {}) {
  //     // tslint:disable-next-line: no-string-literal
  //     config["headers"] = headers;
  //   } else {
  //     config = { headers };
  //   }
  //   return config;
  // }

  /*
  private HandleError(exception: any) {
    // tslint:disable-next-line: no-console
    console.log(11111, this);
    const error = exception.response;
    if (error.status === 403) {
      // this._router.navigate(['/Forbidden']);
      // tslint:disable-next-line: no-console
      console.log("error ", "Forbidden");
      return new ApiException(error, ErrorType.Forbidden);
    } else if (error.status === 401) {
      // this.ResetAuthorizationData();
      // this._router.navigate(['/Unauthorized']);
      // tslint:disable-next-line: no-console
      console.log("error ", "Unauthorized");
      // authService.ResetAuthorizationData();
      return new ApiException(error, ErrorType.Unauthorized);
    } else {
      return new ApiException(error);
    }
  }
  */
  private SetHeaders(flag = false) {
    const token = authService.GetToken();

    let headers = {};

    if (flag) {
      headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // tslint:disable-next-line: object-literal-sort-keys
        Accept: "application/json"
      };
    } else {
      headers = {
        Authorization: "Bearer " + token
      };
    }

    return headers;
  }
}
