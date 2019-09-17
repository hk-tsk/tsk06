import  { IContent,ICourseCategories, ICourseInfo, IPageCategories } from 'src/Entities/Interfaces';
// tslint:disable-next-line: ordered-imports
import {
    CATEGORY_VIEWER_INIT_RECEIVE, CATEGORY_VIEWER_INIT_REQUEST, CATEGORY_VIEWER_INIT_REQUEST_FAILED,
    CONTACT_US_CHANGE_DESC, CONTACT_US_CHANGE_EMAIL, CONTACT_US_CHANGE_NAME,
    CONTENT_INIT, CONTENT_RECEIVE,
    CONTENT_REQUEST, CONTENT_REQUEST_FAILED, FETCH_COURSES_FAILED,
    FETCH_COURSES_SUCCESS, FETCH_INTROPAGES_FAIL, FETCH_INTROPAGES_SUCCESS, PAGE_VIEWER_CATEGORY_SELECTED,
    PAGE_VIEWER_INIT_RECEIVE, PAGE_VIEWER_INIT_REQUEST, PAGE_VIEWER_INIT_REQUEST_FAILED, SITE_IS_OFFLINE, SITE_IS_ONLINE, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT
}
    from './actionConstant';

export interface ILoadSuccessIntroPagesAction {
    type: typeof FETCH_INTROPAGES_SUCCESS,
    items: ICourseInfo[],
    loaded: boolean
}

export interface ILoadFailIntroPagesAction {
    type: typeof FETCH_INTROPAGES_FAIL,
    loaded: boolean,
    error: string
}

export interface ILoadSuccesCoursesAction {
    type: typeof FETCH_COURSES_SUCCESS,
    courses: ICourseInfo[],
    loaded: boolean,
}

export interface ILoadFailedCoursesAction {
    type: typeof FETCH_COURSES_FAILED,
    loaded: boolean,
}

export type IntroPagesActionTypes = ILoadSuccessIntroPagesAction | ILoadFailIntroPagesAction;

export type IoursesActionTypes = ILoadFailedCoursesAction | ILoadSuccesCoursesAction;

export interface IAppIsOfflineAction {
    type: typeof SITE_IS_OFFLINE,
    AppIsOffline: boolean,
}

export interface IAppIsOnlineAction {
    type: typeof SITE_IS_ONLINE,
    AppIsOffline: boolean,
}

export type AppActionTypes = IAppIsOfflineAction | IAppIsOnlineAction;

export interface IInitCategoriesAction {
    type: typeof CATEGORY_VIEWER_INIT_RECEIVE,
    currnetPage: string,
    categoires: ICourseCategories[],
    loaded: boolean,
}

export interface IInitCategoryRequestAction {
    type: typeof CATEGORY_VIEWER_INIT_REQUEST,
    currnetPage: string,
}
export interface IInitCategoryRequestFailedAction {
    type: typeof CATEGORY_VIEWER_INIT_REQUEST_FAILED,
}

export type CategoryViewerActionType = IInitCategoriesAction | IInitCategoryRequestAction | IInitCategoryRequestFailedAction;


export interface IContactUsChangeNameAction {
    type: typeof CONTACT_US_CHANGE_NAME
    Name: string
}

export interface IContactUsChangeEmailAction {
    type: typeof CONTACT_US_CHANGE_EMAIL
    Email: string
}

export interface IContactUsChangeDescAction {
    type: typeof CONTACT_US_CHANGE_DESC
    Desc: string
}

export type ContactUsActionType = IContactUsChangeNameAction | IContactUsChangeEmailAction | IContactUsChangeDescAction;

export interface IInitPagesAction {
    type: typeof PAGE_VIEWER_INIT_RECEIVE,
    currnetPage: string,
    categoires: IPageCategories[],
    loaded: boolean,
}

export interface IInitPagesRequestAction {
    type: typeof PAGE_VIEWER_INIT_REQUEST,
    currnetPage: string,
}
export interface IInitPagesRequestFailedAction {
    type: typeof PAGE_VIEWER_INIT_REQUEST_FAILED,
}

export interface ISelectedCategoryPageAction {
    type: typeof PAGE_VIEWER_CATEGORY_SELECTED,
    categoryName: string,
    categoryTitle: string,
    pageName: string,
}
export type PageViewerActionType = IInitPagesAction | ISelectedCategoryPageAction | IInitPagesRequestAction | IInitPagesRequestFailedAction;

export interface IGetContentAction {
    type: typeof CONTENT_INIT,
    category: string,
    content: IContent[],
}


export interface IContentRequestAction {
    type: typeof CONTENT_REQUEST,
    category: string,
    loaded: boolean,

}

export interface IContentRequestFailedAction {
    type: typeof CONTENT_REQUEST_FAILED,
    category: string,
    loaded: boolean,

}
export interface IContentReceiveAction {
    type: typeof CONTENT_RECEIVE,
    category: string,
    content: IContent[],
    loaded: boolean,
}

export type ContentActions = IGetContentAction | IContentRequestAction | IContentReceiveAction | IContentRequestFailedAction;

export interface IUserLoginSuccessAction {
    type: typeof USER_LOGIN_SUCCESS,
    username: string,
}

export interface IUserLoginFailedAction {
    type: typeof USER_LOGIN_FAILED,
    error: string,
}

export interface IUserLogOutAction {
    type: typeof USER_LOGOUT,
}
export type UserActions = IUserLoginSuccessAction | IUserLoginFailedAction | IUserLogOutAction;