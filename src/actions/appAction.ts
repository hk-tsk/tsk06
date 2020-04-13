// tslint:disable-next-line: ordered-imports
export const SITE_IS_OFFLINE = "SITE_IS_OFFLINE";
export const SITE_IS_ONLINE = "SITE_IS_ONLINE";
export const APP_INITING = "APP_INITING";
export const APP_INITED = "APP_INITED";
export const APP_INIT_FAILED = "APP_INIT_FAILED";

export interface IAppIsOfflineAction {
  type: typeof SITE_IS_OFFLINE;
  appIsOffline: boolean;
}

export interface IAppIsOnlineAction {
  type: typeof SITE_IS_ONLINE;
  appIsOffline: boolean;
}

export interface IAppInitingAction {
  type: typeof APP_INITING;
}

export interface IAppInitedAction {
  type: typeof APP_INITED;
}

export interface IAppInitFailedAction {
  type: typeof APP_INIT_FAILED;
}

export type AppActionTypes =
  | IAppIsOfflineAction
  | IAppIsOnlineAction
  | IAppInitingAction
  | IAppInitedAction
  | IAppInitFailedAction;

export function APPIsOnline(): IAppIsOnlineAction {
  return {
    appIsOffline: false,
    type: SITE_IS_ONLINE
  };
}

export function APPIsOffline(): IAppIsOfflineAction {
  return {
    appIsOffline: true,
    type: SITE_IS_OFFLINE
  };
}

export function APPInited(): IAppInitedAction {
  return {
    type: APP_INITED
  };
}

export function APPIniting(): IAppInitingAction {
  return {
    type: APP_INITING
  };
}

export function APPInitFailed(): IAppInitFailedAction {
  return {
    type: APP_INIT_FAILED
  };
}
