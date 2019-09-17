import { PAGE_VIEWER_CATEGORY_SELECTED, PAGE_VIEWER_INIT_RECEIVE, PAGE_VIEWER_INIT_REQUEST, PAGE_VIEWER_INIT_REQUEST_FAILED } from 'src/actions/actionConstant';
import { PageViewerActionType } from 'src/actions/actionTypes';
import { IPageViewerState } from 'src/Store/AllStates';

// const initState: IPagesState = {
//     pages: []
// }

const initState: IPageViewerState = {
    categories: [],
    loaded: false,
    pageName: "",
    selectedCategory: "",
    selectedCategoryTitle: ""
}

export function PageViewerReducer(state: IPageViewerState = initState, action: PageViewerActionType) {
    // const allPages = state.pages;

    switch (action.type) {
        case PAGE_VIEWER_INIT_REQUEST:
            // const currentPageReq: IPageViewer = {
            //     categories: [],
            //     loaded: false,
            //     pageName: action.currnetPage,
            //     selectedCategory: ""
            // }
            // allPages.push(currentPageReq);
            // return {
            //     pages: allPages,
            // }

            return {
                categories: [],
                loaded: false,
                pageName: action.currnetPage,
                selectedCategory: ""
            }
        case PAGE_VIEWER_INIT_REQUEST_FAILED:

            return {
                ...state,
                categories: [],
                loaded: false,
                selectedCategory: ""
            }
        case PAGE_VIEWER_INIT_RECEIVE:
            // currentPageRec = allPages.find(p => p.pageName === action.currnetPage);
            // if (currentPageRec) {
            //     // tslint:disable-next-line: no-console
            //     console.log(88888888);
            //     currentPageRec.categories = action.categoires;
            //     currentPageRec.loaded = true;
            // }
            // return {
            //     pages: allPages,
            // }

            return {
                ...state,
                categories: action.categoires,
                loaded: true,
            }

        case PAGE_VIEWER_CATEGORY_SELECTED:
            // const currentPage = allPages.find(p => p.pageName === action.pageName);
            // if (currentPage) {
            //     currentPage.selectedCategory = action.categoryName;
            // }
            // return {
            //     pages: allPages,
            // }

            return {
                ...state,
                selectedCategory: action.categoryName,
                selectedCategoryTitle: action.categoryTitle,
            }

        default:
            return state;
    }
}

export const getPageInfo = (state: IPageViewerState) => {
    // return state.pages ? state.pages.find(p => p.pageName === pageName) : null;
    return state;
}

export const getCategories = (state: IPageViewerState) => {
    // const currentItem = getPageInfo(state, pageName);
    // if (currentItem) {
    //     return currentItem.categories;
    // }
    // else { return []; }

    return state.categories;
}

export const getSelectedCategoryPage = (state: IPageViewerState) => {
    // const currentItem = getPageInfo(state, pageName);
    // if (currentItem) {
    //     return currentItem.selectedCategory;
    // }
    // else { return ""; }

    return state.selectedCategory;
}

export const getSelectedCategoryTitlePage = (state: IPageViewerState, name: string) => {
    const cat = state.categories.find ? (state.categories.find(c => c.Name === name)) : null;
    return cat ? cat.Title : "";
}