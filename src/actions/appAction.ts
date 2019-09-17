import { IAppMainState } from 'src/Store/AllStates';
// tslint:disable-next-line: ordered-imports
import { SITE_IS_OFFLINE, SITE_IS_ONLINE } from './actionConstant';
import { IAppIsOfflineAction, IAppIsOnlineAction } from './actionTypes';

export function APPIsOnline(): IAppIsOnlineAction {

    return {
        AppIsOffline: false,
        type: SITE_IS_ONLINE,
    };

}

export function APPIsOffline(): IAppIsOfflineAction {

    return {
        AppIsOffline: true,
        type: SITE_IS_OFFLINE,
    }
}

export const getAppIsOnline = (state: IAppMainState) => state.isOffline === false;
export const getAppIsOffline = (state: IAppMainState) => state.isOffline === true;
