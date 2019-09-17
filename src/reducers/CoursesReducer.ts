import { IoursesActionTypes } from 'src/actions/actionTypes';
import { ICoursesState } from 'src/Store/AllStates';
import { FETCH_COURSES_FAILED, FETCH_COURSES_SUCCESS } from '../actions/actionConstant';

const initState: ICoursesState = {
    courses: [],
    error: "",
    loaded: false,
}

export default function CoursesReducer(state = initState, action: IoursesActionTypes) {
    switch (action.type) {
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                error: "",
                loaded: action.loaded,
            }
        case FETCH_COURSES_FAILED:
            return {
                ...state,
                items: [],
                loaded: action.loaded,
            }
        default:
            return state;
    }
}

export const getCourses = (state: ICoursesState) => state.courses;
export const getCoursesLoaded = (state: ICoursesState) => state.loaded;
export const getCourse = (state: ICoursesState, name: string) => state.courses.find(c => c.Name === name);
export const getCourseLoaded = (state: ICoursesState) => state.loaded;
