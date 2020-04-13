import { Dispatch } from "redux";
import { ApiException } from "src/apis/ApiException";
import { IArticle } from "src/Entities/Interfaces";
import PageApi from "./../apis/PagesApi";
export const ARTICLE_GET_DATA = "ARTICLE_GET_DATA";
export const ARTICLE_GET_DATA_FAILED = "ARTICLE_GET_DATA_FAILED";
export const ARTICLE_GET_DATA_SUCCESS = "ARTICLE_GET_DATA_SUCCESS";

export interface IArticleLoading {
  name: string;
  type: typeof ARTICLE_GET_DATA;
}

export interface IArticleLoadedSuccess {
  article: IArticle;
  type: typeof ARTICLE_GET_DATA_SUCCESS;
}

export interface IArticleLoadedFailed {
  type: typeof ARTICLE_GET_DATA_FAILED;
}

export type IArticleAction =
  | IArticleLoading
  | IArticleLoadedSuccess
  | IArticleLoadedFailed;

const service = new PageApi();

export const GetArticleAction = (articleName: string, course: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    name: articleName,
    type: ARTICLE_GET_DATA
  });

  const response = await service.GetGeneralArticle(articleName, course);

  if (response instanceof ApiException) {
    dispatch({
      type: ARTICLE_GET_DATA_FAILED
    });
  } else {
    dispatch({
      article: response,
      type: ARTICLE_GET_DATA_SUCCESS
    });
  }
};
