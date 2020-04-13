import {
  CLAPS_APPLY_CHANGE,
  CLAPS_APPLY_CHANGE_FAILED,
  CLAPS_APPLY_CHANGE_SUCCESED,
  CLAPS_LOAD_DATA,
  CLAPS_LOAD_DATA_FAILED,
  CLAPS_LOAD_DATA_SUCCESED,
  ClapsActionTypes
} from "src/actions/ClapsAction";
import { ClapsItemTypeEnum } from "src/Entities/Enums";
import { IClapsState } from "src/Store/AllStates";

const initState: IClapsState = {
  // itemId: 0,
  articleClaps: [],
  itemType: "",
  loaded: true,
  productClaps: []
};
export default function ClapsReducer(
  state: IClapsState = initState,
  action: ClapsActionTypes
) {
  switch (action.type) {
    case CLAPS_LOAD_DATA:
      return {
        ...state,
        itemType: action.itemType,
        loaded: false
      };
    case CLAPS_APPLY_CHANGE:
      return {
        ...state,
        // itemId: action.itemId,
        itemType: action.itemType,
        loaded: false
      };
    case CLAPS_LOAD_DATA_SUCCESED:
      if (action.itemType === ClapsItemTypeEnum.Product) {
        return {
          ...state,
          itemType: ClapsItemTypeEnum.Product,
          loaded: true,
          productClaps: action.claps
        };
      } else if (action.itemType === ClapsItemTypeEnum.Article) {
        return {
          ...state,
          articleClaps: action.claps,
          itemType: ClapsItemTypeEnum.Article,
          loaded: true
        };
      } else {
        return state;
      }
      break;

    case CLAPS_APPLY_CHANGE_SUCCESED:
      if (action.itemType === ClapsItemTypeEnum.Product) {
        const claps = state.productClaps;
        const currentItem = claps.find(
          c =>
            c.ItemType === ClapsItemTypeEnum.Product &&
            c.ItemId === action.itemId
        );

        if (currentItem) {
          currentItem.ClapsCount = action.itemCount;
        }
        return {
          ...state,
          loaded: true,
          productClaps: claps
        };
      } else if (action.itemType === ClapsItemTypeEnum.Article) {
        const claps = state.articleClaps;
        let currentItem = claps.find(
          c =>
            c.ItemType === ClapsItemTypeEnum.Article &&
            c.ItemId === action.itemId
        );

        if (currentItem) {
          currentItem.ClapsCount = action.itemCount;
        } else {
          currentItem = {
            ClapsCount: action.itemCount,
            ItemId: action.itemId,
            ItemType: ClapsItemTypeEnum.Product
          };
          claps.push(currentItem);
        }
        return {
          ...state,
          articleClaps: claps,
          loaded: true
        };
      } else {
        return state;
      }

    case CLAPS_LOAD_DATA_FAILED:
    case CLAPS_APPLY_CHANGE_FAILED:
      return {
        ...state,
        loaded: true
      };
    default:
      return state;
  }
}

export const getClapsLoaded = (state: IClapsState) => state.loaded;

export const getClaps = (state: IClapsState, id: number, itemType: string) => {
  if (itemType === ClapsItemTypeEnum.Product) {
    return state.productClaps
      ? state.productClaps.find(c => c.ItemId === id)
      : null;
  } else if (itemType === ClapsItemTypeEnum.Article) {
    return state.articleClaps
      ? state.articleClaps.find(c => c.ItemId === id)
      : null;
  }
  return null;
};
