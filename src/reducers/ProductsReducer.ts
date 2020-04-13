import {
  PRODUCTS_LOAD_DATA,
  PRODUCTS_LOAD_DATA_FAILED,
  PRODUCTS_LOAD_DATA_SUCCESED,
  ProductsActionTypes
} from "src/actions/ProductsAction";
import { IProductsState } from "src/Store/AllStates";

const initState: IProductsState = {
  loaded: true,
  products: []
};
export default function ProductsReducer(
  state: IProductsState = initState,
  action: ProductsActionTypes
) {
  switch (action.type) {
    case PRODUCTS_LOAD_DATA:
      return {
        ...state,
        loaded: false
      };
    case PRODUCTS_LOAD_DATA_SUCCESED:
      return {
        loaded: true,
        products: action.products
      };

    case PRODUCTS_LOAD_DATA_FAILED:
      return {
        loaded: true,
        products: []
      };
    default:
      return state;
  }
}

export const getProducts = (state: IProductsState) => state.products;