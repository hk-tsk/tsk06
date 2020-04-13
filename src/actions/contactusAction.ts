import { Dispatch } from "redux";
import { ApiException } from "src/apis/ApiException";
import GeneralApi from "src/apis/GeneralApi";
import { ClearText } from 'src/Utilities/textConvertor';

export const CONTACT_US_SEND = "CONTACT_US_SEND";
export const CONTACT_US_SEND_SUCCESS = "CONTACT_US_SEND_SUCCESS";

export interface IContactUsSendAction {
  type: typeof CONTACT_US_SEND;
}

export interface IContactUsSendSuccessAction {
  type: typeof CONTACT_US_SEND_SUCCESS;
}

export type ContactUsActionType =
  | IContactUsSendAction
  | IContactUsSendSuccessAction;

const service = new GeneralApi();

export const SendContactUsAction = (
  name: string,
  email: string,
  desc: string
) => async (dispatch: Dispatch) => {
  dispatch({
    sent: false,
    type: CONTACT_US_SEND
  }); 
  const response = await service.SendContactUsOpinion(name, email, ClearText(desc));

  if (response instanceof ApiException) {
    dispatch({
      loaded: false,
      type: CONTACT_US_SEND
    });
  } else {
    dispatch({
      sent: true,
      type: CONTACT_US_SEND_SUCCESS
    });
  }
};
