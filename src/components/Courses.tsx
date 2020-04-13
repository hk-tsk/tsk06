import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ICourseInfo } from "src/Entities/Interfaces";
import { getCourseLoaded, getCourses } from "src/reducers/CoursesReducer";
import { CreateCourseUrl } from "src/routers/router";
import { ICoursesState } from "src/Store/AllStates";
import { IAppState } from "src/Store/store";
import "../styles/Courses.scss";
import ImageComponent from "./ImageComponent";

interface IProps {
  // error: string,
  courses: ICourseInfo[];
  loaded: boolean;
}
class Courses extends React.Component<IProps, ICoursesState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    if (!this.props.loaded) {
      return (
        <div className="ls-row courses-container">
          <div className="loading" />
        </div>
      );
    }

    const col = this.props.courses.length > 3 ? 4 : this.props.courses.length;

    return (
      <div className="ls-row courses-container">
        <h1>دوره ها</h1>
        {this.props.courses.map((info, index) => {
          return (
            <div key={index} className={"ls-col-" + col}>
              <div className="course-item">
                <div className="course-item-header">
                  {
                    <ImageComponent
                      name={info.ImageUrl ? info.ImageUrl : "NotSetImgCourse.svg"}
                      category="Course"
                      alt={info.Title}
                      imgClassName="category-viewer-item-image"
                      // onMouseMove={this.ShowCourseTitle}
                      // onClick={this.ShowCourseTitle}
                    />
                  }
                  <div
                    className="course-item-title"
                    // onMouseLeave={this.HideCourseTitle}
                  >
                    <div className="course-item-title-text">{info.Title}</div>
                  </div>
                </div>

                <div className="course-item-info">{info.Description}</div>
                <div className="course-item-link">
                  <NavLink key={index} to={CreateCourseUrl(info.Name)}>
                    سرفصل های دوره
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  courses: getCourses(state.coursesState),
  loaded: getCourseLoaded(state.coursesState)
});

export default connect(mapStateToProps)(Courses);
