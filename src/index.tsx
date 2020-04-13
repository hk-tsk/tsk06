import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

// import { APPInited, APPInitFailed, APPIniting } from "./actions/appAction";
import { GetClapsActionBase } from "./actions/ClapsAction";
// import { GetClapsActionBase } from "./actions/ClapsAction";
import { FetchCourses } from "./actions/CoursesAction";
// import { authService } from "./apis/auth";
import { ClapsItemTypeEnum } from "./Entities/Enums";
// import { ClapsItemTypeEnum } from "./Entities/Enums";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { appStore } from "./Store/store";

function initApp() {
  // appStore.dispatch(APPIniting());
  // if (authService.startingAuth()) {
  //   return;
  // }
  // authService
  //   .getAccessToken({ aw: true })
  //   .then(() => {
  //     appStore.dispatch(APPInited());
  appStore.dispatch(FetchCourses());

  appStore.dispatch(GetClapsActionBase(ClapsItemTypeEnum.Article));
  appStore.dispatch(GetClapsActionBase(ClapsItemTypeEnum.Product));

  // })
  // .catch(error => {
  //   // tslint:disable-next-line: no-console
  //   console.log(error);
  //   appStore.dispatch(APPInitFailed());
  // });
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  rootElement,
  () => {
    initApp();
  }
);
registerServiceWorker();
