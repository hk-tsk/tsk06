import { RouteComponentProps } from "react-router-dom";
import { IPageViewer } from 'src/Store/AllStates';


export interface ICourseInfo {
    Img: string;
    IntroImg: string;
    IntroInfo: string;
    Name: string;
    Title: string;
    IsNew: boolean;
    CategoryRowColumnsCount:number;
    Categories: IPageCategories[];
}

export interface IPageCategories {
   Name: string;
   Title: string;
}

export interface ICourseCategories {
   Name: string;
   Title: string;
   ImagePosition:number,
   ImageTheme:number,
   ImageUrl: string;
   Description: string;
}

export interface IContent {
   ContentType: string,
   ContentText: string,
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
    Category?: string
}
export interface IPageViewProps extends RouteComponentProps<IPageViewMatchParams> {
    Item: IPageViewer,
    courses: ICourseInfo[];
    InitPage: (name: string) => void;
    SelectedCategoryTitle: string;
}
