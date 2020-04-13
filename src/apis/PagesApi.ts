import { ApiException } from "./ApiException";
import BaseApi from "./BaseApi";

export default class PagesApi extends BaseApi {
  public async GetAsyncCourses() {
    const response = await this.get("/Course");
    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }

  public GetCourses() {
    // this.GetValues();
     // tslint:disable-next-line: no-console
     console.log(767676767676,"course call api");
    // this.GetValues()
    return this.getAsync("Course");
  }

  public GetValues() {
    try {
      this.get("values")
        .then(response => {
          // tslint:disable-next-line: no-console
          console.log(454545, response);
        })
        .catch(err => {
          // tslint:disable-next-line: no-console
          console.log(222222222222222, err);
        });
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log(e, 111111111111111);
    }
  }

  /*
    .then(() => {
      const headers = authService.SetHeaders();
       this.get("values", { headers })
        .then(response => {
          // tslint:disable-next-line: no-console
          console.log(454545, response);
        })
        .catch(err => {
          // tslint:disable-next-line: no-console
          console.log(98989, err);
        });
    });
    */

  public async GetCategories(name: string) {
    const response = await this.get("Course/" + name + "/Category");
    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }

  public async GetContent(name: string, category: string) {
    const response = await this.get("/Content/" + name + "/" + category);
    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }

  public async GetGeneralArticle(name: string, course: string) {
    const response = await this.post("/Article/" + course + "/" + name, {});
    if (response instanceof ApiException) {
      return response;
    } else {
      return response.data;
    }
  }
}
