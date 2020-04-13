import { Dispatch } from "redux";
import { ApiException } from "./../apis/ApiException";
import ProductApi from './../apis/ProductApi';
import { IProducts } from "./../Entities/Interfaces";

export const PRODUCTS_LOAD_DATA = "PRODUCTS_LOAD_DATA";
export const PRODUCTS_LOAD_DATA_FAILED = "PRODUCTS_LOAD_DATA_FAILED";
export const PRODUCTS_LOAD_DATA_SUCCESED = "PRODUCTS_LOAD_DATA_SUCCESED";

export interface IProductsLoadData {
  loaded: boolean,
  type: typeof PRODUCTS_LOAD_DATA;
}
export interface IProductsLoadedData {
  products: IProducts[];
  type: typeof PRODUCTS_LOAD_DATA_SUCCESED;
}
export interface IProductsLoadDataFailed {
  type: typeof PRODUCTS_LOAD_DATA_FAILED;
}
export type ProductsActionTypes =
  | IProductsLoadData
  | IProductsLoadDataFailed
  | IProductsLoadedData;

const service = new ProductApi();

export const LoadProductsAction = () => async (dispatch: Dispatch) => {
  dispatch({
    loaded: false,
    type: PRODUCTS_LOAD_DATA
  });

  const response = await service.GetProducts();

  if (response instanceof ApiException) {
    dispatch({
      loaded: false,
      products: [],
      type: PRODUCTS_LOAD_DATA_FAILED
    });
  } else {
    dispatch({
      loaded: true,
      products: response || [],
      type: PRODUCTS_LOAD_DATA_SUCCESED
    });
  }
};
