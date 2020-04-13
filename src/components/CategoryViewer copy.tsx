// import * as $ from 'jquery'
import * as React from "react";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { InitCategoriesAction } from "src/actions/CategoryAction";
import { ICourseCategories, ICourseInfo } from "src/Entities/Interfaces";
import {
  getCategories,
  getCategoryLoaded,
  getCourseOfCategory
} from "src/reducers/CategoryReducer";
import { getCourse } from "src/reducers/CoursesReducer";
import { IAppState } from "src/Store/store";
import "./../styles/Category.scss";
import ImageComponent from "./ImageComponent";

export interface ICategoryViewerParam {
  Name: string;
}

export interface ICategoryViewerProps
  extends RouteComponentProps<ICategoryViewerParam> {
  categories: ICourseCategories[];
  loaded: false;
  LoadData: (name: string) => void;
  name: string;
  Course: ICourseInfo;
}

class CategoryViewer1 extends React.Component<ICategoryViewerProps> {
  public getCourseName() {
    return this.props.match.params.Name;
  }

  public componentDidMount() {
    this.props.LoadData(this.getCourseName());
  }

  public componentWillReceiveProps(props: ICategoryViewerProps) {
    if (this.props.match.params.Name !== props.match.params.Name) {
      this.props.LoadData(props.match.params.Name);
    }
  }

  public render() {
    const courseTitle = this.props.Course ? this.props.Course.Title : "";

    if (!this.props.loaded) {
      return (
        <div className="category-viewer-container">
          <div className="category-viewer-sider">
            <span>{courseTitle} </span>
          </div>
          <div className="category-viewer-body">loading...</div>
          <div className="loading" />
        </div>
      );
    } else {
      return (
        <div className="category-viewer-container ">
          <div className="category-viewer-sider">
            <span>{courseTitle} </span>
          </div>
          <div className="category-viewer-body ls-row">
            {this.props.categories.map((cat, index) => {
              return (
                <div key={index} className={"ls-col-" + this.GetColNo()}>
                  <div
                    className={
                      "category-viewer-item ls-col-item " +
                      this.GetCustomClassName(cat)
                    }
                  >
                    <div className="category-viewer-item-image-continer ">
                      <ImageComponent
                        name={cat.ImageUrl}
                        category="Category"
                        alt={cat.Title}
                        imgClassName={
                          "category-viewer-item-image" +
                          (cat.ImageTheme !== 0 ? " image-frame" : "")
                        }
                      />
                    </div>
                    <div className="category-viewer-item-content">
                      <h1 className="category-viewer-title">
                        <NavLink
                          to={
                            "/Subject/" + this.getCourseName() + "/" + cat.Name
                          }
                        >
                          {cat.Title}
                        </NavLink>
                      </h1>
                      <p>{cat.Description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  private GetCustomClassName(cat: ICourseCategories) {
    const colNo = this.GetColNo();
    const catColClassName = "cat-col-" + colNo;

    if (cat.ImagePosition === 0 || colNo > 1) {
      return catColClassName + " image-top";
    }
    return (
      catColClassName +
      (cat.ImagePosition === 1 ? " image-left" : " image-right")
    );
  }

  private GetColNo() {
    const colNo =
      this.props.Course &&
      this.props.Course.CategoryRowColumnsCount &&
      this.props.Course.CategoryRowColumnsCount > 1
        ? 2
        : 1;
    return colNo;
  }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
  categories: getCategories(state.categoriesState),
  loaded: getCategoryLoaded(state.categoriesState),
  name: getCourseOfCategory(state.categoriesState),
  // tslint:disable-next-line: object-literal-sort-keys
  Course: getCourse(
    state.coursesState,
    (ownProps as ICategoryViewerProps).match.params.Name
  )
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      LoadData: InitCategoriesAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryViewer1);
