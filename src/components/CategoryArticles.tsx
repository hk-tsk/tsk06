// import * as $ from "jquery";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
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
import "../styles/CategoryArticles.scss";
import BasicArticles from "./Article/BasicArticles";

interface ICategoryViewerParam {
  Name: string;
}

interface ICategoryArticlesProps
  extends RouteComponentProps<ICategoryViewerParam> {
  categories: ICourseCategories[];
  course: ICourseInfo;
  loaded: false;
  LoadData: (name: string) => void;
  name: string;
}

class CategoryArticles extends React.Component<ICategoryArticlesProps> {
  public getCourseName() {
    return this.props.match.params.Name;
  }

  public componentDidMount() {
    this.props.LoadData(this.getCourseName());
  }

  // public CatClick(
  //   event: React.MouseEvent<HTMLLIElement>,
  //   cat: ICourseCategories
  // ) {
  //   $(".category-articels-body").scrollTop(0);

  //   const rec = $("#section" + cat.Id)[0].getBoundingClientRect();
  //   const bodyRec = $(".category-articels-body")[0].getBoundingClientRect();
  //   // tslint:disable-next-line: no-console
  //   console.log(444, "#section" + cat.Id, rec, bodyRec);

  //   // if (bodyRec.height <= rec.height) {
  //   //   $(".category-articels-body").scrollTop(rec.top - bodyRec.height);
  //   // } else {
  //   // $(".category-articels-body").scrollTop(rec.top - 400);
  //   // }
  // }

  public componentWillReceiveProps(props: ICategoryArticlesProps) {
    if (this.props.match.params.Name !== props.match.params.Name) {
      this.props.LoadData(props.match.params.Name);
    }
  }

  public render() {
    const courseTitle = this.props.course ? this.props.course.Title : "";

    if (!this.props.categories || !this.props.categories.length) {
      return (
        <div className="category-articels-container">
          {!this.props.loaded ? <div className="loading" /> : []}

          <div className="category-articels-course">
            <span>{courseTitle} </span>
          </div>
          <ul className="category-articels-header">
            <li className={"category-articels-category-title "}>
              دسته بندی ها >>{" "}
            </li>

            <li className={"category-articels-category "}>
              <a className="category-articels-item-titleّ" href={"#section1"}>
                ...
              </a>
              <span className="article-count" title="تعداد مقاله">
                (0)
              </span>
            </li>
          </ul>
          <ul className="category-articels-body">
            <li className={"category-articels-item "}>
              <section id={"section1"}>
                <div className="category-articels-item-title">...</div>
                <BasicArticles
                  Articles={[]}
                  Category={""}
                  Course={this.props.match.params.Name}
                />
              </section>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div className="category-articels-container">
        {!this.props.loaded ? <div className="loading" /> : []}
        <div className="category-articels-course">
          <span>{courseTitle} </span>
        </div>
        <ul className="category-articels-header">
          <li className={"category-articels-category-title "}>
            دسته بندی ها >>{" "}
          </li>
          {this.props.categories.map((cat, index) => {
            return (
              <li
                key={index}
                className={"category-articels-category "}
                // tslint:disable-next-line: jsx-no-lambda
                // onClick={event => this.CatClick(event, cat)}
              >
                {/* <span className="category-articels-item-titleّ">
                  {cat.Title}
                </span> */}
                <a
                  className="category-articels-item-titleّ"
                  href={"#section" + cat.Id}
                >
                  {cat.Title}
                </a>
                <span className="article-count" title="تعداد مقاله">
                  ({cat.ArticlesCount})
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="category-articels-body">
          {this.props.categories.map((cat, index) => {
            return (
              <li key={index} className={"category-articels-item "}>
                <section id={"section" + cat.Id}>
                  <div className="category-articels-item-title">
                    {cat.Title}
                  </div>

                  <BasicArticles
                    Articles={cat.Articles}
                    Category={cat.Name}
                    Course={this.props.match.params.Name}
                  />
                </section>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
  categories: getCategories(state.categoriesState),
  course: getCourse(
    state.coursesState,
    (ownProps as ICategoryArticlesProps).match.params.Name
  ),
  loaded: getCategoryLoaded(state.categoriesState),
  name: getCourseOfCategory(state.categoriesState)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      LoadData: InitCategoriesAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoryArticles);
