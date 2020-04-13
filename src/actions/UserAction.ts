import { Dispatch } from "redux";
import { ApiException } from "src/apis/ApiException";
import { IRegisterInfo, IUserInfo } from "src/Entities/Interfaces";
import { authService } from "./../apis/auth";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_ERROR_RESET = "USER_LOGIN_ERROR_RESET";

export const USER_REGISTER = "USER_REGISTER";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

export interface IUserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  userinfo: IUserInfo;
  username: string;
}

export interface IUserLoginStartAction {
  type: typeof USER_LOGIN_START;
}

export interface IUserLoginFailedAction {
  type: typeof USER_LOGIN_FAILED;
  error: string;
}

export interface IUserLogOutAction {
  type: typeof USER_LOGOUT;
}

export interface IUserLogInResetErrorAction {
  type: typeof USER_LOGIN_ERROR_RESET;
}

export interface IUserRegisterAction {
  type: typeof USER_REGISTER;
}

export interface IUserRegisterFailedAction {
  type: typeof USER_REGISTER_FAILED;
  error: string;
}

export interface IUserRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS;
}
export type UserActions =
  | IUserLoginSuccessAction
  | IUserLoginFailedAction
  | IUserLogOutAction
  | IUserLoginStartAction
  | IUserLogInResetErrorAction
  | IUserRegisterSuccessAction
  | IUserRegisterFailedAction
  | IUserRegisterAction;

export const LoginAction = (userName: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: USER_LOGIN_START
  });
  const response = await authService.UserLogin(userName, password);
  if (response instanceof ApiException) {
    dispatch({
      type: USER_LOGIN_FAILED,
      // tslint:disable-next-line: object-literal-sort-keys
      error: response.Error
    });
  } else {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      userinfo: response.userData,
      username: userName
    });
  }
};

export const UserRegisterAction = (info: IRegisterInfo) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: USER_REGISTER
  });
  const response = await authService.UserRegister(info);
  if (response instanceof ApiException) {
    dispatch({
      type: USER_REGISTER_FAILED,
      // tslint:disable-next-line: object-literal-sort-keys
      error: response.Error
    });
  } else {
    dispatch({
      type: USER_REGISTER_SUCCESS
    });
  }
};

export const LogOutAction = () => (dispatch: Dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
  authService.Logoff();
};

export const ResetLogErrorAction = () => (dispatch: Dispatch) => {
  dispatch({
    type: USER_LOGIN_ERROR_RESET
  });
};
