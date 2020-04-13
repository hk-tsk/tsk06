import * as React from "react";
import { connect } from "react-redux";
import { ICategoryArticle } from "src/Entities/Interfaces";
import "../../styles/Articles.scss";
import ArticleItem from "./ArticleItem";

interface IBasicArticlesProps {
  Category: string;
  Course: string;
  Articles: ICategoryArticle[];
}
class BasicArticles extends React.Component<IBasicArticlesProps> {
  constructor(props: IBasicArticlesProps) {
    super(props);
  }
  public render() {
    const articles = this.props.Articles || [];
    if (!articles || !articles.length || articles.length === 0) {
      return (
        <div className="articels-container">
          <ul className="articels-items">
            <li className={"articels-item-empty"}>هیچ آیتمی وجود ندارد.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="articels-container">
          <ul className="articels-items">
            {articles.map((art, index) => {
              return (
                <li key={index} className={"articels-item"}>
                  <ArticleItem Article={art} Course={this.props.Course} />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default connect()(BasicArticles);
