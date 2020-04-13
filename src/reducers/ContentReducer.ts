import { CONTENT_RECEIVE, CONTENT_REQUEST, CONTENT_REQUEST_FAILED } from 'src/actions/actionConstant';
import { ContentActions } from 'src/actions/actionTypes';
import { IContentState } from 'src/Store/AllStates';

const initState: IContentState = {
    content: [],
    loaded: true,
}

export default function ContentReducer(state: IContentState = initState, action: ContentActions) {

    switch (action.type) {
        case CONTENT_REQUEST:
            return {
                ...state,
                loaded: false,
            };
        case CONTENT_REQUEST_FAILED:
            return {
                ...state,
                loaded: false,
            };
        case CONTENT_RECEIVE:
            return {
                content: action.content,
                loaded: true,
            };
        default:
            return state;
    }

}

export const getContentLoaded = (state: IContentState) => state.loaded;
export const getContent = (state: IContentState) => state.content;
