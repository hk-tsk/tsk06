import { IContent, ICourseCategories, ICourseInfo, IPageCategories } from 'src/Entities/Interfaces';

// tslint:disable-next-line: no-empty-interface
export interface IState {

}
export interface IAppMainState {
    isOffline: boolean;
    // currentPage:string;
    // pages: {};
}
export interface IIntroPagesState extends IState {
    courses: ICourseInfo[],
    items: ICourseInfo[],
    error: string,
    loaded: boolean
}

export interface ICoursesState extends IState {
    courses: ICourseInfo[],
    error: string,
    loaded: boolean
}

export interface IContacUsState {
    Name: string,
    Email: string,
    Desc: string,
}

export interface ICategoryState {
    categories: ICourseCategories[],
    pageName: string,
    loaded: boolean,
}

export interface IPageViewer {
    categories: IPageCategories[],
    pageName: string,
    loaded: boolean,
    selectedCategory: string,
    selectedCategoryTitle?: string,
}

// tslint:disable-next-line: no-empty-interface
export interface IPageViewerState extends IPageViewer {
}

export interface IPagesState {
    pages: IPageViewer[],
}

export interface IPageViewerInfo {
    Name: string,
    SelectedCategory: string
}

export interface IContentState {
    Loaded: boolean,
    Content: IContent[],
}

export interface IUserState {
    Authorized:boolean,
    Error: string,
    UserName: string,
}