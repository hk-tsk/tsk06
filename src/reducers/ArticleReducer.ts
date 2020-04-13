import {
  ARTICLE_GET_DATA,
  ARTICLE_GET_DATA_FAILED,
  ARTICLE_GET_DATA_SUCCESS,
  IArticleAction
} from "src/actions/ArticleAction";
import { IArticleState } from "src/Store/AllStates";

const initState: IArticleState = {
  article: {
    Name: "",
    Title: "",
    // tslint:disable-next-line: object-literal-sort-keys
    ArticleItems: [],
    PreArticle: { Name: "", Title: "" },
    NextArticle: { Name: "", Title: "" }
  },
  loaded: true,
  name: ""
};
export default function ArticleReducer(
  state: IArticleState = initState,
  action: IArticleAction
) {
  switch (action.type) {
    case ARTICLE_GET_DATA:
      return {
        ...state,
        loaded: false,
        name:action.name,
      };

    case ARTICLE_GET_DATA_SUCCESS:
      return {
        ...state,
        article: action.article,
        loaded: true
      };
    case ARTICLE_GET_DATA_FAILED:
      return {
        ...state,
        loaded: true
      };
    default:
      return state;
  }
}

export const getArticleLoaded = (state: IArticleState) => state.loaded;
export const getArticle = (state: IArticleState) => state.article;
