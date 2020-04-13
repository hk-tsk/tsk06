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

class CategoryViewer extends React.Component<ICategoryViewerProps> {
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
          <div className="loading" />
        </div>
      );
    } else {
      return (
        <div className="category-viewer-container ">
          <div className="category-viewer-sider">
            <span>{courseTitle} </span>
          </div>
          <div className="category-viewer-body ">
            <div className="category-viewer-item-col">
              {this.props.categories.map((cat, index) => {
                return (
                  <div key={index} className={"category-viewer-item "}>
                    <div className="category-viewer-item-image-continer ">
                      <ImageComponent
                        name={cat.ImageUrl || "catNoImage.svg"}
                        category="Category"
                        alt={cat.Title}
                        imgClassName="category-viewer-item-image"
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
                        <span className="category-viewer-title-article-count" title="تعداد مقاله"> ({cat.ArticlesCount})</span>
                      </h1>
                      <p>{cat.Description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  // private GetColNo() {
  //   let colNo = "1";

  //   if (this.props.categories && this.props.categories.length) {
  //     colNo =
  //       this.props.categories.length >= 4
  //         ? "bg-" + 4
  //         : this.props.categories.length + "";
  //   }

  //   return "ls-col-" + colNo;
  // }
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
)(CategoryViewer);
