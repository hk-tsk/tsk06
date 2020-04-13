import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { GetArticleAction } from "src/actions/ArticleAction";
import { ContentType } from "src/Entities/Enums";
import { IArticle, ICourseInfo } from "src/Entities/Interfaces";
import { getArticle, getArticleLoaded } from "src/reducers/ArticleReducer";
import { getCourse } from "src/reducers/CoursesReducer";
import { CreateArticleUrl, CreateCourseUrl } from "src/routers/router";
import { IAppState } from "src/Store/store";
import { ApplyLineStyle } from "src/Utilities/textConvertor";
import "../../styles/ArticleViewer.scss";
import ImageComponent from "../ImageComponent";

interface IArticleViewerParam {
  Course: string;
  Name: string;
}

interface IArticleViewerProps extends RouteComponentProps<IArticleViewerParam> {
  article: IArticle;
  course: ICourseInfo;
  getData: (name: string, course: string) => void;
}

class ArticleViewer extends React.Component<IArticleViewerProps> {
  constructor(props: IArticleViewerProps) {
    super(props);
  }

  public getArticleName() {
    return this.props.match.params.Name;
  }

  public componentWillMount() {
    this.props.getData(
      this.props.match.params.Name,
      this.props.match.params.Course
    );
  }

  public componentWillReceiveProps(newProps: IArticleViewerProps) {
    if (this.props.match.params.Name !== newProps.match.params.Name) {
      this.props.getData(
        newProps.match.params.Name,
        newProps.match.params.Course
      );
    }
  }

  public CodeDesign(code: string) {
    const lines = (code || "").split("\n");

    return lines.map((line, index) => {
      const danf = {
        __html: ApplyLineStyle(line)
      };
      return (
        <p className="code-line" key={index}>
          <span className="code-line-number">{index + 1}</span>
          <span dangerouslySetInnerHTML={danf} />
        </p>
      );
    });
  }

  public render() {
    const courseTitle = this.props.course ? this.props!.course.Title || "" : "";
    let info = <div>مقاله ی مورد نظر یافت نشد.</div>;
    let link = <div />;
    if (this.props.article) {
      let prelink = <div />;
      let nextlink = <div />;
      if (this.props.article.PreArticle) {
        prelink = (
          <span className="article-viewer-prelink" title="مقاله ی قبلی">
            <NavLink
              to={CreateArticleUrl(
                this.props.match.params.Course,
                this.props.article.PreArticle.Name
              )}
            >
              {"<< " + this.props.article.PreArticle.Title}
            </NavLink>
          </span>
        );
      }
      if (this.props.article.NextArticle) {
        nextlink = (
          <span className="article-viewer-nextlink" title="مقاله ی بعدی">
            <NavLink
              to={CreateArticleUrl(
                this.props.match.params.Course,
                this.props.article.NextArticle.Name
              )}
            >
              {">> " + this.props.article.NextArticle.Title}
            </NavLink>
          </span>
        );
      }
      link = (
        <div className="article-viewer-links">
          {prelink}
          {nextlink}
        </div>
      );

      const content = this.props.article.ArticleItems.map((c, index) => {
        const contentType = c.ArticleItemType + "";
        if (contentType === ContentType.Image) {
          return (
            <div key={index} className="content-image-container">
              <ImageComponent
                name={c.FileName}
                category="Content"
                alt={c.Text}
                imgClassName={"content-img " + " image-frame"}
              />
            </div>
          );
          //  <img key={index} className="content-img " src={c.ContentText} />
        } else if (contentType === ContentType.Code) {
          return (
            <div key={index} className="content-code">
              {this.CodeDesign(c.Text)}
            </div>
          );
        } else if (contentType === ContentType.Title) {
          return (
            <div key={index} className="content-title">
              {c.Text}
            </div>
          );
        } else {
          return (
            <p key={index} className="content-content">
              {c.Text}
            </p>
          );
        }
      });

      info = (
        <div className="article-viewer-info">
          <div className="article-viewer-title">{this.props.article.Title}</div>
          {content}
        </div>
      );
    }
    return (
      <div className="article-viewer-container">
        <div className="article-viewer-course">
          <NavLink to={CreateCourseUrl(this.props.match.params.Course)}>
            {courseTitle}
          </NavLink>
        </div>
        <div className="article-viewer-content">{info}</div>
        {link}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
  article: getArticle(state.articleState),

  course: getCourse(
    state.coursesState,
    (ownProps as IArticleViewerProps).match.params.Course
  ),
  loaded: getArticleLoaded(state.articleState)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getData: GetArticleAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewer);
