import { SITE_IS_OFFLINE, SITE_IS_ONLINE } from 'src/actions/actionConstant';
import { AppActionTypes } from 'src/actions/actionTypes';
import { IAppMainState } from 'src/Store/AllStates';

const initState: IAppMainState = {
    // currentPage: "",
    isOffline: false,
    // pages: {}
};

export function AppReducer(state: IAppMainState = initState, action: AppActionTypes) {
    switch (action.type) {
        case SITE_IS_ONLINE:
            return {
                ...state,
                isOffline: false,
            }
        case SITE_IS_OFFLINE:
            return {
                ...state,
                isOffline: true,
            }
        // case PAGES_INIT:
        //     if (action.pageName && !state.pages[action.pageName]) {
        //         const initPage: IPageViewerInfo = {
        //             Name: action.pageName,
        //             SelectedCategory: "",
        //         }
        //         state.pages[action.pageName] = initPage;
        //     }
        //     return {
        //         ...state,
        //         currentPage: action.pageName,
        //         pages: state.pages,
        //     };
        default:
            return state;
    }
}