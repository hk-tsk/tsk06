import { RouteComponentProps } from "react-router-dom";
import { IPageViewer } from "src/Store/AllStates";

export interface ICourseInfo {
  ImageUrl: string;
  IntroImg: string;
  Description: string;
  Name: string;
  Title: string;
  IsNew: boolean;
  CategoryRowColumnsCount: number;
  Categories: IPageCategories[];
}

export interface IPageCategories {
  Name: string;
  Title: string;
}

export interface ICourseCategories {
  Name: string;
  Title: string;
  Id: number;
  ImagePosition: number;
  ImageTheme: number;
  ImageUrl: string;
  Description: string;
  ArticlesCount: number;
  Articles: ICategoryArticle[];
}

export interface ICategoryArticle {
  Category: string;
  Description: string;
  Id: number;
  Image: string;
  Name: string;
  Title: string;
}
export interface IContent {
  ContentType: string;
  ContentText: string;
}
export interface IPageListState {
  loaded: boolean;
  items: ICourseInfo[];
  error: string;
  LoadData: () => void;
}
export interface IAppComponent {
  name?: string;
}
export interface IPageViewMatchParams {
  Name: string;
  Category?: string;
}
export interface IPageViewProps
  extends RouteComponentProps<IPageViewMatchParams> {
  Item: IPageViewer;
  courses: ICourseInfo[];
  InitPage: (name: string) => void;
  SelectedCategoryTitle: string;
}

export interface IProducts {
  ClapsNum: number;
  Description: string;
  Id: number;
  ImageName: string;
  Price: number;
  Title: string;
}

export interface IClaps {
  Added: boolean;
  ItemId: number;
  ItemType: string;
  User: string;
  ClientInfo: string;
}

export interface IClapsItem {
  ClapsCount?: number;
  ItemId: number;
  ItemType: string;
}

export interface IArticleItem {
  ArticleItemType: string;
  FileName: string;
  Text: string;
}
export interface IArticle {
  ArticleItems: IArticleItem[];
  PreArticle: ILinkArticle;
  Name: string;
  NextArticle: ILinkArticle;
  Title: string;
}

export interface ILinkArticle {
  Name: string;
  Title: string;
}

export interface IUserInfo {
  Name: string;
  LastName: string;
  FullName: string;
}

export interface IRegisterInfo {
  Email: string;
  Name: string;
  LastName: string;
  PhoneNumber: string;
  Password:string;
  ConfirmPassword:string;
}
