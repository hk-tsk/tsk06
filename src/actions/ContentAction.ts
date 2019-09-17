import { Dispatch } from 'redux';
import { ApiException } from 'src/apis/ApiException';
import PagesApi from 'src/apis/PagesApi';
import { CONTENT_RECEIVE, CONTENT_REQUEST, CONTENT_REQUEST_FAILED } from './actionConstant';

const pagesApi = new PagesApi();

export const GetContent = (name: string, categoryName: string) =>
    async (dispatch: Dispatch) => {

        dispatch({
            category: categoryName,
            loaded: false,
            type: CONTENT_REQUEST,
        })
        const response = await pagesApi.GetContent(name, categoryName);
        if (response instanceof ApiException) {
            dispatch({
                category: categoryName,
                loaded: false,
                type: CONTENT_REQUEST_FAILED,
            })
        } else {

            dispatch({
                content: response || [],
                loaded: true,
                type: CONTENT_RECEIVE,
            });
        }
    }