import {
  IArticle,
  IClapsItem,
  IContent,
  ICourseCategories,
  ICourseInfo,
  IPageCategories,
  IProducts,
  IUserInfo
} from "src/Entities/Interfaces";

// tslint:disable-next-line: no-empty-interface
export interface IState {}
export interface IFormState {
  formErrors: {};
  formValid: boolean;
}
export interface IAppMainState {
  initedApp: number;
  isOffline: boolean;
}
export interface IIntroPagesState extends IState {
  courses: ICourseInfo[];
  items: ICourseInfo[];
  error: string;
  loaded: boolean;
}

export interface ICoursesState extends IState {
  courses: ICourseInfo[];
  error: string;
  loaded: boolean;
}

export interface IContacUsState extends IFormState {
  name: string;
  email: string;
  desc: string;
  sent: boolean;
}

export interface ICategoryState {
  categories: ICourseCategories[];
  pageName: string;
  loaded: boolean;
}

export interface IPageViewer {
  categories: IPageCategories[];
  pageName: string;
  loaded: boolean;
  selectedCategory: string;
  selectedCategoryTitle?: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IPageViewerState extends IPageViewer {}

export interface IPagesState {
  pages: IPageViewer[];
}

export interface IContentState {
  loaded: boolean;
  content: IContent[];
}

export interface IUserState {
  authorized: boolean;
  error: string;
  loading: boolean;
  succeded:boolean;
  userName: string;
  userInfo: IUserInfo | null;
}

export interface IProductsState {
  loaded: boolean;
  products: IProducts[];
}

export interface IClapsState {
  // itemId: number;
  articleClaps: IClapsItem[];
  itemType: string;
  loaded: boolean;
  productClaps: IClapsItem[];
}

export interface IArticleState {
  article: IArticle;
  loaded: boolean;
  name: string;
}
