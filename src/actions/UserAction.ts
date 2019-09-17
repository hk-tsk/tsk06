import { Dispatch } from 'redux';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from './actionConstant';


export const LoginAction = (userName: string, password: string) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            username: userName,
        })

    }

export const LogOutAction = () =>
    (dispatch: Dispatch) => {

        dispatch({
            type: USER_LOGOUT,
        })

    }
