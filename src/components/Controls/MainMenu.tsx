import * as $ from "jquery";
import * as React from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ICourseInfo } from "src/Entities/Interfaces";
import { getCourses } from "src/reducers/CoursesReducer";
import { CreateCourseUrl } from "src/routers/router";
import { IAppState } from "src/Store/store";

interface IMainMenuProps {
  courses: ICourseInfo[];
}
export class MainMenu extends React.Component<IMainMenuProps> {
  constructor(props: IMainMenuProps) {
    super(props);
  }
  public OnclickHandler(e: React.MouseEvent<HTMLDivElement>) {
    if (window.navigator.userAgent.indexOf("Mobile") > -1) {
      if (
        $(e.target).hasClass("main-menu-bar-container") ||
        $(e.target).hasClass("item-collapse") ||
        $(e.target).hasClass("none-click-item")
      ) {
        $(".main-menu-bar-container .main-level").removeClass("hide-menu-item");
      } else {
        $(".main-menu-bar-container .main-level").addClass("hide-menu-item");
      }
    }
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

  public CheckCourseIsActive = (match: any, location: { pathname: string }) => {
    if (!location) {
      return false;
    }
    if (
      location.pathname.indexOf("/Categories/") > -1 ||
      location.pathname.indexOf("/Course/") > -1
    ) {
      return true;
    } else {
      return false;
    }
  };
  public render() {
    const coursesNavs = this.props.courses.map((course, index) => {
      return (
        <li className="menu-item" key={index}>
          <NavLink
            to={CreateCourseUrl(course.Name)}
            activeClassName="active-page"
          >
            {course.Title}
          </NavLink>
        </li>
      );
    });
    return (
      <div className="main-menu-bar-container" onClick={this.OnclickHandler}>
        <ul className="main-level">
          <li className="menu-item">
            <NavLink
              to="/Home"
              isActive={this.CheckHomeIsActive}
              activeClassName="active-page"
            >
              صفحه اصلی
            </NavLink>
          </li>
          <li className="menu-item item-collapse ">
            <NavLink
              to="/#"
              isActive={this.CheckCourseIsActive}
              activeClassName="active-page"
              className="none-click-item"
              // tslint:disable-next-line: jsx-no-lambda
              onClick={e => e.preventDefault()}
            >
              دوره ها&nbsp;&nbsp;
            </NavLink>
            <ul>{coursesNavs}</ul>
          </li>
          <li className="menu-item">
            <NavLink to="/AboutUs" activeClassName="active-page">
              درباره ما
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/ContactUs" activeClassName="active-page">
              تماس با ما
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  courses: getCourses(state.coursesState)
});

export default connect(mapStateToProps)(MainMenu);
