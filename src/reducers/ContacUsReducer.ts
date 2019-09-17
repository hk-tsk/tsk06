import { CONTACT_US_CHANGE_DESC, CONTACT_US_CHANGE_EMAIL, CONTACT_US_CHANGE_NAME } from 'src/actions/actionConstant';
import { ContactUsActionType } from 'src/actions/actionTypes';
import { IContacUsState } from 'src/Store/AllStates';

const initState: IContacUsState = {
    Desc: "",
    Email: "",
    Name: "",

};

export function ContactUsProducer(state: IContacUsState = initState, action: ContactUsActionType) {

    switch (action.type) {
        case CONTACT_US_CHANGE_NAME:
            return {
                ...state,
                Name: action.Name,
            }
        case CONTACT_US_CHANGE_EMAIL:
            return {
                ...state,
                Email: action.Email,
            }
        case CONTACT_US_CHANGE_DESC:
            return {
                ...state,
                Desc: action.Desc,
            }
        default:
            return state;
    }
}

export const getName = (state: IContacUsState) => state.Name;
export const getEmail = (state: IContacUsState) => state.Email;
export const getDesc = (state: IContacUsState) => state.Desc;
