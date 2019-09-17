import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk'
import { AppReducer } from 'src/reducers/appReducer';
import { CategoryReducer } from 'src/reducers/CategoryReducer';
import { ContactUsProducer } from 'src/reducers/ContacUsReducer';
import ContentReducer from 'src/reducers/ContentReducer';
import CoursesReducer from 'src/reducers/CoursesReducer';
import { PageViewerReducer } from 'src/reducers/PageViewerReducer';
import { UserReducer } from 'src/reducers/UserReducer';
import { IAppMainState, ICategoryState, IContacUsState, IContentState, ICoursesState, IPageViewerState, IUserState } from './AllStates';
import { LoadState, saveState } from './StorageMng'
export interface IAppState {
    appMainState: IAppMainState,
    categoriesState:ICategoryState,
    contactusState: IContacUsState,
    coursesState: ICoursesState,
    pagesState: IPageViewerState,
    contentState: IContentState,
    userState: IUserState,
}

const rootReaducer = combineReducers<IAppState>({
    appMainState: AppReducer,
    categoriesState:CategoryReducer,
    contactusState: ContactUsProducer,
    // tslint:disable-next-line: object-literal-sort-keys
    contentState: ContentReducer,
    coursesState: CoursesReducer,
    pagesState: PageViewerReducer,
    userState: UserReducer,
});

const stateName = "SMng"
export function configStore(): Store<IAppState, any> {

    const persistState = LoadState(stateName);
    const store = createStore(rootReaducer, persistState, applyMiddleware(thunk));

    store.subscribe(() => {
        saveState({
            userState: store.getState().userState
        }, stateName)
    })
    return store;
}

export const appStore = configStore();