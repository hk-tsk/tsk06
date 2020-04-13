import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ApiException } from 'src/apis/ApiException';
import PagesApi from 'src/apis/PagesApi';
import { IIntroPagesState } from 'src/Store/AllStates';
import { FETCH_COURSES_FAILED, FETCH_COURSES_SUCCESS } from './actionConstant';
import { IntroPagesActionTypes } from './actionTypes';

const pagesApi = new PagesApi();

export const FetchAsyncCourses: ActionCreator<
    ThunkAction<Promise<any>, IIntroPagesState, null, IntroPagesActionTypes>> = () => {

        return async (dispatch: Dispatch) => {
            const response = await pagesApi.GetAsyncCourses();

            if (response instanceof ApiException) {
                dispatch({
                    courses: [],
                    loaded: false,
                    type: FETCH_COURSES_FAILED,
                })
            } else {
                dispatch({
                    courses: response || [],
                    loaded: true,
                    type: FETCH_COURSES_SUCCESS,
                })
            }

        }
    }


export const FetchCourses: ActionCreator<
    ThunkAction<Promise<any>, IIntroPagesState, null, IntroPagesActionTypes>> = () => {

        return (dispatch: Dispatch) => pagesApi.GetCourses()
            .then((response: any) => {
                if (response instanceof ApiException) {
                    dispatch({
                        courses: [],
                        loaded: true,
                        type: FETCH_COURSES_FAILED,
                    });
                }
                else {
                    dispatch({
                        courses: response.data || [],
                        loaded: true,
                        type: FETCH_COURSES_SUCCESS,
                    });
                }
            })
            .catch(error => {
                dispatch({
                    courses: [],
                    loaded: false,
                    type: FETCH_COURSES_FAILED,
                });
            });
    }
