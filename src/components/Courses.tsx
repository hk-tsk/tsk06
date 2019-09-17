import 'bootstrap/dist/css/bootstrap.css'
import * as $ from 'jquery'
import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import PagesApi from 'src/apis/PagesApi';
import { ICourseInfo } from 'src/Entities/Interfaces';
import { getCourseLoaded, getCourses } from 'src/reducers/CoursesReducer';
import { ICoursesState } from 'src/Store/AllStates';
import { IAppState } from 'src/Store/store';
import '../styles/Courses.scss'

interface IProps {
  // error: string,
  courses: ICourseInfo[],
  loaded: boolean,
}
const pagesApi = new PagesApi();

class Courses extends React.Component<IProps, ICoursesState> {
  constructor(props: IProps) {
    super(props);
    this.ShowCourseTitle = this.ShowCourseTitle.bind(this);
    this.HideCourseTitle = this.HideCourseTitle.bind(this);
  }

  public HideCourseTitle(event: React.MouseEvent<HTMLDivElement>) {
    const el = event.currentTarget || new HTMLImageElement();
    $(el).hide();
  }
  public ShowCourseTitle(event: React.MouseEvent<HTMLImageElement>) {
    const el = event.currentTarget.nextSibling || new HTMLImageElement();
    $(el).show();
  }

  public render() {

    if (!this.props.loaded) {
      return (<div className="ls-row courses-container">
        <div className="loading">.</div>
      </div>)
    }

    const col = this.props.courses.length > 2 ? 3 : this.props.courses.length;

    return (
      <div className="ls-row courses-container">
        {this.props.courses.map((info, index) => {
          return <div key={index} className={"ls-col-" + col} >
            <div className="course-item">
              <div className="course-item-header">
                {
                  <img src={ pagesApi.GetImageUrl(info.Img ? info.Img : "NotSetImgCourse.svg", "Course")}
                    // tslint:disable-next-line: jsx-no-lambda
                    onError={(elem) => elem.currentTarget.className = "img-not-found"}
                    onMouseMove={this.ShowCourseTitle}
                    onClick={this.ShowCourseTitle}
                    className="course-item-img" alt={info.Title} />}
                <div className="course-item-title" onMouseLeave={this.HideCourseTitle}><div >{info.Title}</div></div>
              </div>

              <div className="course-item-info" >{info.IntroInfo}</div>
              <div className="course-item-link">
                <NavLink key={index} to={'/Categories/' + info.Name} >ادامه ...</NavLink>

              </div>
            </div>
          </div>
        })}
      </div>
    );

  }
}

const mapStateToProps = (state: IAppState) => (
  {
    courses: getCourses(state.coursesState),
    loaded: getCourseLoaded(state.coursesState)
  }
)

export default connect(mapStateToProps)(Courses)