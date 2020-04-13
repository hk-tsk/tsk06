import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ClapsItemTypeEnum } from "src/Entities/Enums";
import { ICategoryArticle } from "src/Entities/Interfaces";
import { CreateArticleUrl } from 'src/routers/router';
import "../../styles/ArticleItem.scss";
import Claps from "../Controls/Claps";
import ImageComponent from "../ImageComponent";

// tslint:disable-next-line: no-empty-interface
interface IArticleItemProps {
  Article: ICategoryArticle;
  Course: string;
}
class ArticleItem extends React.Component<IArticleItemProps> {
  constructor(props: IArticleItemProps) {
    super(props);
  }

  public render() {
    const article = this.props.Article || null;
    return (
      <div className="article-item-container">
        <div className={"article-item-right" + this.getCss()}>
          <div className="article-item-title">
            <NavLink to={CreateArticleUrl(this.props.Course, article.Name)}>
              {article!.Title}
            </NavLink>
          </div>
          <div className="article-item-claps">
            <Claps ItemId={article.Id} ItemType={ClapsItemTypeEnum.Article} />
          </div>
        </div>
        {/* <div className="article-item-middle">{article.Description}</div> */}
        {article.Image ? (
          <div className={"article-item-left " + this.getCss()}>
            <ImageComponent
              name={article.Image}
              category="Article"
              alt={article.Title}
              imgClassName="article-item-image"
            />
          </div>
        ) : (
          []
        )}
      </div>
    );
  }

  private getCss() {
    return this.props.Article && this.props.Article.Image
      ? " article-item-with-image"
      : " ";
  }
}

export default connect()(ArticleItem);
