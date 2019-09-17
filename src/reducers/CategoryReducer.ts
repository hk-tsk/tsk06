import { CATEGORY_VIEWER_INIT_RECEIVE, CATEGORY_VIEWER_INIT_REQUEST, CATEGORY_VIEWER_INIT_REQUEST_FAILED } from 'src/actions/actionConstant';
import { CategoryViewerActionType } from 'src/actions/actionTypes';
import { ICategoryState } from 'src/Store/AllStates';


const initState: ICategoryState = {
    categories: [],
    loaded: false,
    pageName: "",
}

export function CategoryReducer(state: ICategoryState = initState, action: CategoryViewerActionType) {
    switch (action.type) {
        case CATEGORY_VIEWER_INIT_REQUEST:
            return {
                categories: [],
                loaded: false,
                pageName: action.currnetPage,
            }
        case CATEGORY_VIEWER_INIT_REQUEST_FAILED:

            return {
                ...state,
                categories: [],
                loaded: false,
            }
        case CATEGORY_VIEWER_INIT_RECEIVE:
            return {
                ...state,
                categories: action.categoires,
                loaded: true,
            }

        default:
            return state;
    }
}


export const getCategories = (state: ICategoryState) => {
    return state.categories;
}

export const getCategoryLoaded = (state: ICategoryState) => {
    return state.loaded;
}

export const getCourseOfCategory = (state: ICategoryState) => {
    return state.pageName;
}
