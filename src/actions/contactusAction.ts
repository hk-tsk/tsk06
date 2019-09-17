import { CONTACT_US_CHANGE_DESC, CONTACT_US_CHANGE_EMAIL, CONTACT_US_CHANGE_NAME } from './actionConstant';
import { IContactUsChangeDescAction, IContactUsChangeEmailAction, IContactUsChangeNameAction } from './actionTypes';

export function ChangeNameAction(name: string): IContactUsChangeNameAction {
    return {
        Name: name,
        type: CONTACT_US_CHANGE_NAME,
    }
}

export function ChangeDescAction(desc: string): IContactUsChangeDescAction {
    return {
        Desc: desc,
        type: CONTACT_US_CHANGE_DESC,
    }
}

export function ChangeEmailAction(email: string): IContactUsChangeEmailAction {
    return {
        Email: email,
        type: CONTACT_US_CHANGE_EMAIL,
    }
}