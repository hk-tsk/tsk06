import { Dispatch } from "redux";
import { IClapsItem } from "src/Entities/Interfaces";
import { ApiException } from "../apis/ApiException";
import ClapsApi from "../apis/ClapsApi";

export const CLAPS_LOAD_DATA = "CLAPS_LOAD_DATA";
export const CLAPS_LOAD_DATA_FAILED = "CLAPS_LOAD_DATA_FAILED";
export const CLAPS_LOAD_DATA_SUCCESED = "CLAPS_LOAD_DATA_SUCCESED";

export const CLAPS_APPLY_CHANGE = "CLAPS_APPLY_CHANGE";
export const CLAPS_APPLY_CHANGE_FAILED = "CLAPS_APPLY_CHANGE_FAILED";
export const CLAPS_APPLY_CHANGE_SUCCESED = "CLAPS_APPLY_CHANGE_SUCCESED";

export interface IClapsLoadData {
  itemType: string;
  loaded: boolean;
  type: typeof CLAPS_LOAD_DATA;
}
export interface IClapsLoadedData {
  itemType: string;
  claps: IClapsItem[];
  type: typeof CLAPS_LOAD_DATA_SUCCESED;
}
export interface IClapsLoadDataFailed {
  type: typeof CLAPS_LOAD_DATA_FAILED;
}

export interface IClapsChangeData {
  itemId: number;
  itemType: string;
  loaded: boolean;
  type: typeof CLAPS_APPLY_CHANGE;
}

export interface IClapsChangedData {
  itemId: number;
  itemType: string;
  itemCount: number;
  type: typeof CLAPS_APPLY_CHANGE_SUCCESED;
}

export interface IClapsChangeDataFailed {
  type: typeof CLAPS_APPLY_CHANGE_FAILED;
}

export type ClapsActionTypes =
  | IClapsLoadData
  | IClapsLoadDataFailed
  | IClapsLoadedData
  | IClapsChangeData
  | IClapsChangedData
  | IClapsChangeDataFailed;

const service = new ClapsApi();

export const GetClapsActionBase = (itemtype: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    itemType: itemtype,
    loaded: false,
    type: CLAPS_LOAD_DATA
  });
  const response = await service.GetClaps(itemtype);

  if (response instanceof ApiException) {
    dispatch({
      loaded: false,
      type: CLAPS_LOAD_DATA_FAILED
    });
  } else {
    dispatch({
      claps: response,
      itemType: itemtype,
      loaded: true,
      type: CLAPS_LOAD_DATA_SUCCESED
    });
  }
};

export const ChangeClapsActionBase = (
  id: number,
  type: string,
  added: boolean,
  user:string
) => async (dispatch: Dispatch) => {
  dispatch({
    // itemId: id,
    itemType: type,
    loaded: false,
    type: CLAPS_APPLY_CHANGE
  });

  const response = await service.ApplyClaps(id, type, added,user);

  if (response instanceof ApiException) {
    dispatch({
      loaded: true,
      type: CLAPS_APPLY_CHANGE_FAILED
    });
  } else {
    dispatch({
      itemCount: response,
      itemId: id,
      itemType: type,
      loaded: true,
      type: CLAPS_APPLY_CHANGE_SUCCESED
    });
  }
};

// const GetProductClapsAction = () => async (dispatch: Dispatch) =>
//   GetClapsActionBase(ClapsItemTypeEnum.Product);

// const ChangeProductClapsAction = (id: number, added: boolean,user:string) => async (
//   dispatch: Dispatch
// ) => ChangeClapsActionBase(id, ClapsItemTypeEnum.Product, added,user);

// export const ChangeClapsAction = (
//   id: number,
//   itemType: string,
//   added: boolean,
//   user:string
// ) => async (dispatch: Dispatch) => {
//   if (itemType === ClapsItemTypeEnum.Product) {
//     ChangeProductClapsAction(id, added,user);
//   }
// };

// export const GetAllClapsAction = () => async (dispatch: Dispatch) => {
//
//   GetClapsActionBase(ClapsItemTypeEnum.Product);
// };
