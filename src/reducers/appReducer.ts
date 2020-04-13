import {
  APP_INIT_FAILED,
  APP_INITED,
  APP_INITING,
  AppActionTypes,
  SITE_IS_OFFLINE,
  SITE_IS_ONLINE
} from "src/actions/appAction";
import { IAppMainState } from "src/Store/AllStates";

const initState: IAppMainState = {
  isOffline: false,
  // tslint:disable-next-line: object-literal-sort-keys
  initedApp: 0
};

export function AppReducer(
  state: IAppMainState = initState,
  action: AppActionTypes
) {
  switch (action.type) {
    case SITE_IS_ONLINE:
      return {
        ...state,
        isOffline: false
      };
    case SITE_IS_OFFLINE:
      return {
        ...state,
        isOffline: true
      };
    case APP_INITING:
      return {
        ...state,
        initedApp: 0
      };
    case APP_INITED:
      return {
        ...state,
        initedApp: 1
      };
    case APP_INIT_FAILED:
      return {
        ...state,
        initedApp: -1
      };
    default:
      return state;
  }
}

export const getAppIsOnline = (state: IAppMainState) =>
  state.isOffline === false;
export const getAppIsOffline = (state: IAppMainState) =>
  state.isOffline === true;
export const getAppInited = (state: IAppMainState) => state.initedApp === 1;
export const getAppInitFailed = (state: IAppMainState) =>
  state.initedApp === -1;
