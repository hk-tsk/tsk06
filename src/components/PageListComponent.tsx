import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react';
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { ICourseInfo } from 'src/Entities/Interfaces';
import { getCourseLoaded, getCourses } from 'src/reducers/CoursesReducer';
import { IIntroPagesState } from 'src/Store/AllStates';
import { IAppState } from 'src/Store/store';
import '../styles/PageComponent.scss'

interface IProps {
  // error: string,
  items: ICourseInfo[],
  loaded: boolean,
}

class PageListComponent extends React.Component<IProps, IIntroPagesState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const colCount = this.props.items.length > 3 ? 4 : this.props.items.length;
    return (
      <div className="ls-row page-container">
        {this.props.items.map((info, index) => {
          return <div key={index} className={"ls-col-" + colCount}>
            <div className="page-item">
              <div className={info.IsNew !== true ? "new-badge-hidden" : "new-badge"} ><span className="rotate-span">جدید</span></div>
              <div className="page-item-header">
                <img src={process.env.PUBLIC_URL + '/images/' + info.IntroImg}
                  // tslint:disable-next-line: jsx-no-lambda
                  onError={(elem) => elem.currentTarget.className = "img-not-found"} className="page-item-img" alt={info.Title} />
                <div className="page-item-title">
                  <NavLink
                    key={index} to={'/Page/' + info.Title} >{info.Title}</NavLink>
                </div>

              </div>

              <div className="page-item-info" >{info.IntroInfo}</div>
            </div>
          </div>
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => (
  {
    items: getCourses(state.coursesState),
    loaded: getCourseLoaded(state.coursesState)
  }
)

export default connect(mapStateToProps)(PageListComponent)