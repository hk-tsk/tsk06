import {
  CONTACT_US_SEND,
  CONTACT_US_SEND_SUCCESS,
  ContactUsActionType
} from "src/actions/contactusAction";
import { IContacUsState } from "src/Store/AllStates";

const initState: IContacUsState = {
  desc: "",
  email: "",
  formErrors: {},
  formValid: true,
  name: "",
  // tslint:disable-next-line: object-literal-sort-keys
  sent: false,
};

export function ContactUsProducer(
  state: IContacUsState = initState,
  action: ContactUsActionType
) {
  switch (action.type) {
    case CONTACT_US_SEND:
      return {
        ...state,
        sent: false
      };
    case CONTACT_US_SEND_SUCCESS:
      return {
        ...state,
        sent: true
      };
    default:
      return state;
  }
}

export const getContactusSent = (state: IContacUsState) => state.sent;
