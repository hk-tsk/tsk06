import {
  USER_LOGIN_ERROR_RESET,
  USER_LOGIN_FAILED,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
  UserActions
} from "src/actions/UserAction";
import { authService } from "src/apis/auth";
import { IUserState } from "src/Store/AllStates";

const initUser: IUserState = {
  authorized: false,
  error: "",
  loading: false,
  succeded: true,
  userInfo: null,
  userName: ""
};

export function UserReducer(
  state: IUserState = initUser,
  action: UserActions
): IUserState {
  switch (action.type) {
    case USER_REGISTER:
    case USER_LOGIN_START:
      return {
        ...state,
        loading: true,
        succeded: false
      };
    case USER_LOGIN_ERROR_RESET:
      return {
        ...state,
        error: "",
        loading: false,
        succeded: false
      };
    case USER_LOGIN_SUCCESS:
      return {
        authorized: true,
        error: "",
        loading: false,
        succeded: true,
        userInfo: action.userinfo,
        userName: action.username
      };
    case USER_REGISTER_SUCCESS:
      return {
        authorized: false,
        error: "",
        loading: false,
        succeded: true,
        userInfo: null,
        userName: ""
      };
    case USER_LOGIN_FAILED:
    case USER_REGISTER_FAILED:
      return {
        authorized: false,
        error: action.error,
        loading: false,
        succeded: false,
        userInfo: null,
        userName: ""
      };

    case USER_LOGOUT:
      return {
        ...state,
        authorized: false,
        error: "",
        userInfo: null,
        userName: ""
      };
    default:
      return state;
  }
}

export const getUser = (state: IUserState) => state.userName;
export const getUserInfo = (state: IUserState) => state.userInfo;
export const isLogined = (state: IUserState) =>
  state.authorized && authService.IsAuthorized;
export const errorMessage = (state: IUserState) => state.error;
export const getLoginLoading = (state: IUserState) => state.loading;
export const getSucceded = (state: IUserState) => state.succeded;
