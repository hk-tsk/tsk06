import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "src/reducers/appReducer";
import ArticleReducer from "src/reducers/ArticleReducer";
import { CategoryReducer } from "src/reducers/CategoryReducer";
import ClapsReducer from "src/reducers/ClapsReducer";
import { ContactUsProducer } from "src/reducers/ContacUsReducer";
import ContentReducer from "src/reducers/ContentReducer";
import CoursesReducer from "src/reducers/CoursesReducer";
import { PageViewerReducer } from "src/reducers/PageViewerReducer";
import ProductsReducer from "src/reducers/ProductsReducer";
import { UserReducer } from "src/reducers/UserReducer";
import { storage } from "./../Utilities/StorageMng";
import {
  IAppMainState,
  IArticleState,
  ICategoryState,
  IClapsState,
  IContacUsState,
  IContentState,
  ICoursesState,
  IPageViewerState,
  IProductsState,
  IUserState
} from "./AllStates";
export interface IAppState {
  appMainState: IAppMainState;
  articleState: IArticleState;
  categoriesState: ICategoryState;
  clapsState: IClapsState;
  contactusState: IContacUsState;
  coursesState: ICoursesState;
  pagesState: IPageViewerState;
  productsState: IProductsState;
  contentState: IContentState;
  userState: IUserState;
}

const rootReaducer = combineReducers<IAppState>({
  appMainState: AppReducer,
  articleState: ArticleReducer,
  categoriesState: CategoryReducer,
  clapsState: ClapsReducer,
  contactusState: ContactUsProducer,
  // tslint:disable-next-line: object-literal-sort-keys
  contentState: ContentReducer,
  coursesState: CoursesReducer,
  pagesState: PageViewerReducer,
  productsState: ProductsReducer,
  userState: UserReducer
});

const stateName = "SMng";
export function configStore(): Store<IAppState, any> {
  const persistState = storage.retrieve(stateName);
  const store = createStore(rootReaducer, persistState, applyMiddleware(thunk));

  store.subscribe(() => {
    storage.store(stateName, {
      userState: store.getState().userState
    });
  });
  return store;
}

export const appStore = configStore();
