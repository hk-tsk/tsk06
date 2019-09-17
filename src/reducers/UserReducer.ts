import { USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT } from 'src/actions/actionConstant';
import { UserActions } from 'src/actions/actionTypes';
import { IUserState } from 'src/Store/AllStates';

const initUser: IUserState = {
    Error: "",
    UserName: "",
}

export function UserReducer(state: IUserState = initUser, action: UserActions) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                Error: "",
                UserName: action.username,
            }
        case USER_LOGIN_FAILED:
            return {
                Error: action.error,
                UserName: "",
            }
            case USER_LOGOUT:
                return {
                    Error: "",
                    UserName: "",
                }
        default:
            return state;
    }
}

export const getUser = (state: IUserState) => state.UserName;
export const isLogined = (state: IUserState) => state.UserName !== "" ;