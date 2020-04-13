import axios from "axios";
import { IRegisterInfo } from "src/Entities/Interfaces";
import { storage } from "./../Utilities/StorageMng";
import { oauthUrl } from "./apiConfig";
import { ApiException, ErrorType } from "./ApiException";

class OAuth {
  public IsAuthorized: boolean;

  // public UserData: IUserInfo;
  protected oauthBaseUrl = oauthUrl;
  protected tokenUrl = "/connect/token";
  protected authorizeUrl = "/connect/authorize";
  protected registerUrl = "/api/Account/RegisterUser";
  protected logoffUrl = "/connect/endsession";
  protected userinfoUrl = "/connect/userinfo";

  private authkeyName = "authorizationData";

  // private clientId = "989974e8-a04b-492c-a412-cbb041455d84";
  private secretId = "secret";
  private storage = storage;
  private needSetHref = false;

  private oauthAxiosObj = axios.create({
    baseURL: this.oauthBaseUrl
  });

  constructor() {
    if (this.storage.retrieve("IsAuthorized") !== "") {
      this.IsAuthorized = this.storage.retrieve("IsAuthorized");
    }
    // if (this.storage.retrieve("userData") !== "") {
    //   this.UserData = this.storage.retrieve("userData");
    // }
    if (window.location.hash) {
      this.AuthorizedCallback();
    }
  }
  public SetHeaders() {
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    //  headers.append("Accept", "application/json");

    const token = this.GetToken();

    let headers = {};

    if (token !== "") {
      // headers.append("Authorization", "Bearer " + token);
      headers = {
        "Content-Type": "application/json",
        // tslint:disable-next-line: object-literal-sort-keys
        Accept: "application/json",
        Authorization: "Bearer " + token
      };
    }

    return headers;
  }

  public ResetAuthorizationData() {
    this.storage.store(this.authkeyName, "");
    // this.storage.store("authorizationDataIdToken", "");

    this.IsAuthorized = false;
    this.storage.store("IsAuthorized", false);
  }
  public SetAuthorizationData(token: any, idToken: any) {
    if (this.storage.retrieve(this.authkeyName) !== "") {
      this.storage.store(this.authkeyName, "");
    }

    if (token === undefined || token === "") {
      return;
    }
    this.storage.store(this.authkeyName, token);
    if (idToken !== undefined) {
      this.storage.store("authorizationDataIdToken", idToken);
    }
    this.IsAuthorized = true;
    this.storage.store("IsAuthorized", true);

    if (this.needSetHref) {
      this.needSetHref = false;
      window.location.href = location.origin;
    }

    // else {
    //   this.getUserData();
    // }
  }

  // //////////////////////////////////////////////////////

  public startingAuth() {
    return this.storage.retrieve("startAuth") || false;
  }
  public getAccessToken(config: any) {
    return new Promise<any>(resolve => {
      this.storage.store("startAuth", false);
      resolve();
    });
    if (
      this.IsAuthorized &&
      this.storage.retrieve("IsAuthorized") &&
      this.GetToken() !== ""
    ) {
      // if (this.UserData === undefined) {
      //   this.getUserData();
      // }
      return new Promise<any>(resolve => {
        this.storage.store("startAuth", false);
        resolve();
      });
    }
    if (config.cc) {
      // tslint:disable-next-line: no-console
      console.log(222222, "cc");
      return this.getClientCredentials();
    } else if (config.ac) {
      // tslint:disable-next-line: no-console
      console.log(222222, "ac");
      return this.getAuthorization_code();
    } else {
      // tslint:disable-next-line: no-shadowed-variable
      return new Promise<any>(() => {
        // tslint:disable-next-line: no-console
        console.log(222222, "!!cc");
        this.getImplicit();
      });
    }
  }

  public UserLogin(username: string, password: string) {
    // tslint:disable-next-line: no-console
    console.log(username, password);

    return this.getAccessTokenByPass(username, password);
  }

  public UserRegister(info: IRegisterInfo) {
    // tslint:disable-next-line: no-console
    console.log(info);
    const clientId = "258974e8-a04b-492c-a412-cbb041455d84";
    const redirectUri = location.origin;

    const headers = {
      Accept: "application/json",
      "content-Type": "application/json"
    };

    const data = {
      ConfirmPassword: info.ConfirmPassword,
      Email: info.Email,
      Password: info.Password,
      User: {
        LastName: info.LastName,
        Name: info.Name,
        PhoneNumber: info.PhoneNumber
      }
    };

    // tslint:disable-next-line: no-console
    console.log(data, "eee");

    const url =
      this.registerUrl +
      "?" +
      "client_id=" +
      clientId +
      "&client_secret=" +
      this.secretId +
      "&redirect_uri=" +
      encodeURI(redirectUri) +
      "&scope=learning";

    return this.oauthAxiosObj
      .post(url, data, {
        headers
      })
      .then((response: any) => {
        // tslint:disable-next-line: no-console
        console.log(156565565666, response);
        return response;
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(9999999999999999999, error);
        return this.HandleError(error);
      });
  }
  public GetToken(): any {
    return this.storage.retrieve(this.authkeyName);
  }

  public Logoff() {
    // const authorizationUrl = this.logoffUrl;
    // tslint:disable-next-line: variable-name
    //  const id_token_hint = this.storage.retrieve("authorizationDataIdToken");
    // tslint:disable-next-line: variable-name
    const token_hint = this.GetToken();

    // tslint:disable-next-line: no-console
    console.log("logoff", token_hint);
    // return;

    if (token_hint === undefined || token_hint === null) {
      return;
    }
    // tslint:disable-next-line: variable-name
    const post_logout_redirect_uri = location.origin + "/logout";

    const url =
      this.oauthBaseUrl +
      this.logoffUrl +
      "?" +
      "token_hint=" +
      encodeURI(token_hint) +
      "&" +
      "post_logout_redirect_uri=" +
      encodeURI(post_logout_redirect_uri);

    this.ResetAuthorizationData();
    window.location.href = url;
  }

  public HandleError(exception: any) {
    const error = exception.response;
    // tslint:disable-next-line: no-console
    console.log("err", error);
    if (error === undefined && exception.message) {
      return new ApiException(exception.message, ErrorType.General);
    }
    if (error.status === 400) {
      // tslint:disable-next-line: no-console
      console.log("error ", "bad request", error);
      if (error.data) {
        const data = error.data;
        if (data.error_description) {
          return new ApiException(data.error_description, ErrorType.General);
        } else if (data.error) {
          return new ApiException(data.error + "", ErrorType.General);
        } else if (Object.keys(data).length > 0) {
          let message = "";
          Object.keys(data).map((err, index) => {
            message = message + "\r\n " + data[err];
          });
          return new ApiException(message, ErrorType.General);
        }
        return new ApiException(error.data + "", ErrorType.General);
      } else {
        return new ApiException(error.statusText + " 400", ErrorType.General);
      }
    }
    if (error.status === 404) {
      // tslint:disable-next-line: no-console
      console.log("error ", "NotFound", error);
      return new ApiException(error.statusText + " url", ErrorType.General);
    } else if (error.status === 403) {
      // this._router.navigate(['/Forbidden']);
      // tslint:disable-next-line: no-console
      console.log("error ", "Forbidden");
      window.location.href = location.origin + "/";
      return new ApiException(error.data, ErrorType.Forbidden);
    } else if (error.status === 401) {
      // this.ResetAuthorizationData();
      // this._router.navigate(['/Unauthorized']);
      // tslint:disable-next-line: no-console
      console.log("error ", "Unauthorized");
      // authService.ResetAuthorizationData();
      //  this.Logoff();

      return new ApiException(error.data, ErrorType.Unauthorized);
    } else {
      return new ApiException(error.data);
    }
  }

  private getUserData = (token: string) => {
    const headers = {
      "Content-Type": "application/json",
      // tslint:disable-next-line: object-literal-sort-keys
      Accept: "application/json",
      Authorization: "Bearer " + token
    };

    return this.oauthAxiosObj
      .get(this.userinfoUrl, {
        headers
      })
      .then(response => {
        const data = response.data;
        const userData = {
          FullName: data.name + " " + data.last_name,
          LastName: data.last_name,
          Name: data.name
        };
        return { userData };
        //   this.storage.store("userData", this.UserData);
        // window.location.href = location.origin;
      })
      .catch(err => {
        // this.storage.delete("userData");
        // delete this.UserData;
        return this.HandleError(err);
      });
  };
  private getAccessTokenByPass(username: string, password: string) {
    // this.ResetAuthorizationData();
    const clientId = "258974e8-a04b-492c-a412-cbb041455d84";
    const redirectUri = location.origin;
    const responseType = "id_token token"; // password id_token token  code id_token client_credentials authorization_code

    const headerobj = {
      "content-Type": "application/x-www-form-urlencoded"
    };

    let data =
      "grant_type=password&username=" + username + "&password=" + password;

    data =
      data +
      "&response_type=" +
      responseType +
      "&client_id=" +
      clientId +
      "&client_secret=" +
      this.secretId +
      "&redirect_uri=" +
      encodeURI(redirectUri);

    const that = this;
    return this.oauthAxiosObj
      .post(this.tokenUrl, data, {
        headers: headerobj
      })
      .then((response: any) => {
        // tslint:disable-next-line: no-console
        console.log(1000000000, response);
        that.SetAuthorizationData(response.data.access_token, "");
        return that.getUserData(response.data.access_token).catch(error => {
          // tslint:disable-next-line: no-console
          console.log(2545454545, error.response);
          return that.HandleError(error);
        });
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(2111111111111111, typeof error, error);
        return this.HandleError(error);
      });
  }
  // authorization_code
  private getAuthorization_code() {
    this.ResetAuthorizationData();
    const clientId = "189974e8-a04b-492c-a412-cbb041455d84";
    const scope = "openid profile learning";
    const redirectUri = location.origin + "/";
    const code = this.storage.retrieve("code");
    if (this.startingAuth() || (code !== undefined && code !== "")) {
      const grantType = "authorization_code";
      // redirectUri = apiServer + "/";

      //  const codeVerifier = this.storage.retrieve("vc");
      const data =
        "grant_type=" +
        grantType +
        "&code=" +
        code +
        "&redirect_uri=" +
        redirectUri +
        "&" +
        "client_id=" +
        encodeURI(clientId) +
        "&" +
        "client_secret=" +
        encodeURI(this.secretId) +
        "&" +
        "scope=" +
        encodeURI(scope); // +
      // "&code_verifier=" +
      // codeVerifier;

      const that = this;
      return this.oauthAxiosObj
        .post(this.tokenUrl, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((response: any) => {
          that.storage.store("startAuth", false);
          that.storage.delete("code");
          that.SetAuthorizationData(response.data.access_token, "");
          window.location.href = location.origin + "/";
        })
        .catch(error => {
          that.storage.delete("code");
          that.storage.store("startAuth", false);
          that.Logoff();
        });
    }

    this.storage.store("startAuth", true);

    const responseType = "code id_token"; // password id_token token  code id_token client_credentials authorization_code

    let codeChallengePrimery = Math.random() * 10;
    const codeChallengeLength = codeChallengePrimery.toString().length;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < codeChallengeLength; index++) {
      codeChallengePrimery = codeChallengePrimery * 10;
    }
    let codeChallenge = codeChallengePrimery.toString();
    // tslint:disable-next-line: prefer-for-of
    for (let index = codeChallengeLength; index < 64; index++) {
      codeChallenge = codeChallenge + "0";
    }

    // tslint:disable-next-line: no-console
    console.log("codeChallenge", codeChallenge);
    const nonce = "N" + Math.random() + "" + Date.now();
    const state = Date.now() + "" + Math.random();

    this.storage.store("authStateControl", state);
    this.storage.store("vC", codeChallenge);

    const url =
      this.authorizeUrl +
      "?" +
      "response_type=" +
      responseType +
      "&" +
      "client_id=" +
      encodeURI(clientId) +
      "&" +
      "client_secret=" +
      encodeURI(this.secretId) +
      "&" +
      "redirect_uri=" +
      encodeURI(redirectUri) +
      "&" +
      "scope=" +
      encodeURI(scope) +
      // "&" +
      // "code_challenge=" +
      // encodeURI(codeChallenge + "") +
      // "&" +
      // "code_challenge_method=S256" +
      "&" +
      "nonce=" +
      encodeURI(nonce);

    return new Promise<any>(resolve => {
      window.location.href = url;

      resolve();
    });
  }

  // impilicit
  private getImplicit() {
    this.ResetAuthorizationData();

    const clientId = "955bab17e28f4af2b38d31f8287c5725";
    const redirectUri = location.origin + "/";
    const responseType = "id_token token"; // password id_token token  code id_token client_credentials authorization_code
    const scope = "openid profile learning";
    const nonce = "N" + Math.random() + "" + Date.now();
    const state = Date.now() + "" + Math.random();

    this.storage.store("authStateControl", state);
    // this.storage.store('authNonce', nonce);

    const url =
      this.authorizeUrl +
      "?" +
      "response_type=" +
      encodeURI(responseType) +
      "&" +
      "client_id=" +
      encodeURI(clientId) +
      "&" +
      "redirect_uri=" +
      encodeURI(redirectUri) +
      "&" +
      "scope=" +
      encodeURI(scope) +
      "&" +
      "nonce=" +
      encodeURI(nonce) +
      "&" +
      "state=" +
      encodeURI(state) +
      "&" +
      "client_secret=" +
      encodeURI(this.secretId);

    window.location.href = url;
  }

  // client_credentials
  private getClientCredentials() {
    this.ResetAuthorizationData();

    const clientId = "935bab17e28f4af2b38d31f8287c5725";

    const grantType = "client_credentials";
    const responseType = "code id_token";
    const url =
      "grant_type=" +
      encodeURI(grantType) +
      "&" +
      "client_id=" +
      encodeURI(clientId) +
      "&" +
      "client_secret=" +
      encodeURI(this.secretId) +
      "&" +
      "response_type=" +
      encodeURI(responseType);

    const that = this;
    return this.oauthAxiosObj
      .post(this.tokenUrl, url, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then((response: any) => {
        // tslint:disable-next-line: no-console
        console.log(1, response);
        that.SetAuthorizationData(response.data.access_token, "");
      });
    /*
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(2, error);
        throw new Error(error);
      })
      */
  }
  /*
  
  private getAccessToken88888() {
    this.ResetAuthorizationData();

    const headerobj = {
      "content-Type": "application/x-www-form-urlencoded",
      // tslint:disable-next-line: object-literal-sort-keys
      Accept: "application/json",
      WithCredential: true
    };

    const redirectUri = location.origin + "/";
    const scope = "openid profile learning";
    const nonce = "N" + Math.random() + "" + Date.now();
    const state = Date.now() + "" + Math.random();

    this.storage.store("authStateControl", state);

    const data =
      "grant_type=" +
      encodeURI("client_credentials") + // id_token token
      "&" +
      "client_id=" + //
      encodeURI(this.clientId) +
      "&" +
      "redirect_uri=" +
      encodeURI(redirectUri) +
      "&" +
      "scope=" +
      encodeURI(scope) +
      "&" +
      "nonce=" +
      encodeURI(nonce) +
      "&" +
      "state=" +
      encodeURI(state) +
      "&" +
      "client_secret=" +
      encodeURI(this.secretId);

    // tslint:disable-next-line: no-console
    console.log(data);

    const that = this;
    return this.oauthAxiosObj
      .post("/connect/token", data, {
        headers: headerobj
      })
      .then((response: any) => {
        // tslint:disable-next-line: no-console
        console.log(20000000000, response);
        that.SetAuthorizationData(response.data.access_token, "");
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(2, error);
      });
  }
 
*/
  private AuthorizedCallback() {
    this.ResetAuthorizationData();

    const hash = window.location.hash.substr(1);

    const result: any = hash
      .split("&")
      // tslint:disable-next-line: only-arrow-functions
      .reduce(function(
        // tslint:disable-next-line: no-shadowed-variable
        result: any,
        item: string
      ) {
        const parts = item.split("=");
        result[parts[0]] = parts[1];
        return result;
      }, {});

    let token = "";
    let code = "";
    // tslint:disable-next-line: variable-name
    let id_token = "";
    let authResponseIsValid = false;

    if (!result.error) {
      if (
        result.code === undefined &&
        result.state !== this.storage.retrieve("authStateControl")
      ) {
        // tslint:disable-next-line: no-console
        console.log("AuthorizedCallback incorrect state");
      } else {
        token = result.access_token;
        id_token = result.id_token;
        code = result.code;

        const dataIdToken: any = this.getDataFromToken(id_token);

        if (code !== undefined && code !== "" && code !== null) {
          this.storage.store("code", code);
          this.storage.store("authorizationDataIdToken", dataIdToken);

          this.getAuthorization_code();
          /*.then(() => {
            this.getUserData();
          })
          */
          return;
        }
        // // validate nonce
        // if (dataIdToken.nonce !== this.storage.retrieve("authNonce")) {
        //   // tslint:disable-next-line: no-console
        //   console.log("AuthorizedCallback incorrect nonce");
        // } else {
        this.storage.store("authNonce", "");
        this.storage.store("authStateControl", "");

        authResponseIsValid = true;
        // tslint:disable-next-line: no-console
        console.log(
          "AuthorizedCallback state and nonce validated, returning access token"
        );
        // }
      }
    }

    if (authResponseIsValid) {
      // this.needSetHref = true;
      this.SetAuthorizationData(token, id_token);
    }
  }

  private getDataFromToken(token: any) {
    let data = {};
    if (typeof token !== "undefined") {
      const encoded = token.split(".")[1];
      data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
  }
  private urlBase64Decode(str: string) {
    let output = str.replace("-", "+").replace("_", "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("Illegal base64url string!");
    }

    return window.atob(output);
  }
}

export const authService = new OAuth();
