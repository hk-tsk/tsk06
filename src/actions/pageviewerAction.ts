import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApiException } from 'src/apis/ApiException';
import PagesApi from 'src/apis/PagesApi';
import { IPagesState } from 'src/Store/AllStates';
import { PAGE_VIEWER_CATEGORY_SELECTED, PAGE_VIEWER_INIT_RECEIVE, PAGE_VIEWER_INIT_REQUEST, PAGE_VIEWER_INIT_REQUEST_FAILED } from './actionConstant';
import { ISelectedCategoryPageAction, PageViewerActionType } from './actionTypes';

const pagesApi = new PagesApi();

export const InitPageAction1: ActionCreator<
    ThunkAction<Promise<any>, IPagesState, null, PageViewerActionType>> = (name: string) => {

        return async (dispatch: Dispatch) => {
            dispatch({
                categoires: [],
                currnetPage: name,
                loaded: false,
                type: PAGE_VIEWER_INIT_REQUEST,
            });

            const response = await pagesApi.GetCategories(name);

            if (response instanceof ApiException) {
                dispatch({
                    categoires: [],
                    currnetPage: name,
                    loaded: false,
                    type: PAGE_VIEWER_INIT_REQUEST_FAILED,
                });
            } else {
                dispatch({
                    categoires: response || [],
                    currnetPage: name,
                    loaded: true,
                    type: PAGE_VIEWER_INIT_RECEIVE,
                });
            }
        }
    }


export const InitPageAction = (name: string) => async (dispatch: Dispatch) => {
    dispatch({
        categoires: [],
        currnetPage: name,
        loaded: false,
        type: PAGE_VIEWER_INIT_REQUEST,
    });

    const response = await pagesApi.GetCategories(name);
    dispatch({
        categoires: response || [],
        currnetPage: name,
        loaded: true,
        type: PAGE_VIEWER_INIT_RECEIVE,
    });
};

export function SetSelectedCategoryForPageAction(name: string, catrgory: string, title: string): ISelectedCategoryPageAction {
    return {
        type: PAGE_VIEWER_CATEGORY_SELECTED,
        // tslint:disable-next-line: object-literal-sort-keys
        categoryName: catrgory,
        categoryTitle: title,
        pageName: name

    }
}