import { Dispatch } from 'redux';
import { ApiException } from 'src/apis/ApiException';
import PagesApi from 'src/apis/PagesApi';
import { CATEGORY_VIEWER_INIT_RECEIVE, CATEGORY_VIEWER_INIT_REQUEST, CATEGORY_VIEWER_INIT_REQUEST_FAILED } from './actionConstant';

const pagesApi = new PagesApi();


export const InitCategoriesAction = (name: string) => async (dispatch: Dispatch) => {

    dispatch({
        categoires: [],
        currnetPage: name,
        loaded: false,
        type: CATEGORY_VIEWER_INIT_REQUEST,
    });

    const response = await pagesApi.GetCategories(name);

    if (response instanceof ApiException) {
        dispatch({
            categoires: [],
            currnetPage: name,
            loaded: false,
            type: CATEGORY_VIEWER_INIT_REQUEST_FAILED,
        })
    } else {
        dispatch({
            categoires: response || [],
            currnetPage: name,
            loaded: true,
            type: CATEGORY_VIEWER_INIT_RECEIVE,
        });
    }
};
