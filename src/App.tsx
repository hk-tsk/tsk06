import "@babel/polyfill";
import "bootstrap/scss/bootstrap.scss";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import { connect } from "react-redux";
import MainMenu from "./components/Controls/MainMenu";
import OfflineComponent from "./components/OfflineComponent";
import LoginLogOut from "./components/User/LoginLogOut";
import { ICourseInfo } from "./Entities/Interfaces";
import { getAppInited, getAppInitFailed } from "./reducers/appReducer";
import { getCourses } from "./reducers/CoursesReducer";
import AppRouter from "./routers/router";
import { IAppState } from "./Store/store";

interface IAppProps {
  appInited: boolean;
  appInitFailed: boolean;
  courses: ICourseInfo[];
}
class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
  }

  public CheckHomeIsActive = (match: any, location: { pathname: string }) => {
    if (!location) {
      return false;
    }
    if (location.pathname === "/" || location.pathname === "/Home") {
      return true;
    } else {
      return false;
    }
  };

  public componentDidMount() {
    this.showOnScrollImag();
  }

  public showOnScrollImag() {
    // Detect request animation frame
    const scroll =
      window.requestAnimationFrame ||
      // IE Fallback
      function reqFunc(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    function loop() {
      const elementsToShow = document.querySelectorAll(".show-on-scroll");

      Array.prototype.forEach.call(elementsToShow, function applyCss(
        element: any
      ) {
        if (
          ((element.tagName === "IMG" && element.complete) ||
            element.tagName !== "IMG") &&
          isElementInViewport(element)
        ) {
          element.classList.add("is-visible");
        }
        // else {
        //     element.classList.remove('is-visible');
        // }
      });

      scroll(loop);
    }

    // Call the loop for the first time
    loop();

    // Helper function from: http://stackoverflow.com/a/7557433/274826
    function isElementInViewport(el: any) {
      // special bonus for those using jQuery
      if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
      }
      const rect = el.getBoundingClientRect();
      // return (
      //     (rect.top <= 0
      //         && rect.bottom >= 0)
      //     ||
      //     (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      //         rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      //     ||
      //     (rect.top >= 0 &&
      //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      // );
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) / 2 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    }
  }

  public componentDidCatch(error: any) {
    // tslint:disable-next-line: no-console
    console.log(999999999999999, error);
  }

  public render() {
    document.title = "Learning Programming Site";
    // TODO security
    // if (!this.props.appInited && !this.props.appInitFailed) {
    //   return <div>waiting...</div>;
    // }
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            <div className="app-menubar ">
              <MainMenu />
              <div className="user-bar">
                <LoginLogOut />
              </div>
            </div>
          </header>

          <div className="pages-container">
            {AppRouter.map((rt, index: number) => {
              // tslint:disable-next-line: jsx-no-lambda
              return (
                <Route
                  key={index}
                  exact={rt.exact || false}
                  path={rt.path}
                  // tslint:disable-next-line: jsx-no-lambda
                  render={props => <rt.component {...props} />}
                />
              );
            })}
          </div>
          <OfflineComponent />
          <div className="App-footer">
            <div className="copy-right">
              کلیه ی حقوق این سایت متعلق به taskSources.com می باشد.
              <br />
              version 7.0
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  appInitFailed: getAppInitFailed(state.appMainState),
  appInited: getAppInited(state.appMainState),
  courses: getCourses(state.coursesState)
});

export default connect(mapStateToProps)(App);
