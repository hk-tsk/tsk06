import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { LoadProductsAction } from "src/actions/ProductsAction";
import { ClapsItemTypeEnum } from "src/Entities/Enums";
import { getProducts } from "src/reducers/ProductsReducer";
import { IAppState } from "src/Store/store";
import AddToCart from "../Controls/AddToCart";
import Claps from "../Controls/Claps";
import ImageComponent from "../ImageComponent";
import { IProducts } from "./../../Entities/Interfaces";
import "./../../styles/Product.scss";

interface IProductsProps {
  loadData: () => void;
  loaded: boolean;
  products: IProducts[];
}

class Products extends React.Component<IProductsProps> {
  constructor(props: IProductsProps) {
    super(props);
  }
  public componentDidMount() {
    this.props.loadData();
  }
  public render() {
    const products = this.props.products || [];
    return (
      <div className="products-container">
        {/* <h2>محصولات</h2> */}
        {this.props.loaded ? <div className="loading" /> : null}
        <div className="products-wrapper">
          {products.map((item, index) => {
            return (
              <div key={index} className="products-item">
                <div className="products-item-col products-item-image-continer ">
                  <ImageComponent
                    name={item.ImageName || "ProductsNoImage.svg"}
                    category="Product"
                    alt={item.Title}
                    imgClassName="products-item-image"
                  />
                </div>
                <div className=" products-item-col products-item-body-continer ">
                  <div className="products-item-title">{item.Title}</div>
                  <div className="products-item-detais">
                    <div className="products-item-desc">{item.Description}</div>
                  </div>
                </div>
                <div className="products-item-price">
                  {/* <span className="products-item-price-lable">قیمت :</span>
                  <span> {Currency(item.Price)}</span>
                  <span>ریال</span>
                  <span
                    className="products-item-price-add-to-cart"
                    title="افزودن یه سبد خرید"
                  /> */}
                  <AddToCart
                    ProductId={item.Id}
                    Title={item.Title}
                    Price={item.Price}
                  />
                </div>
                <div className="products-item-claps">
                  {/* <span>{item.ClapsNum || 100}</span>
                  <img
                    // tslint:disable-next-line: jsx-no-lambda
                    onError={elem =>
                      (elem.currentTarget.className = "img-not-found")
                    }
                    src={process.env.PUBLIC_URL + "/images/claps.jpg"}
                    alt="claps"
                  /> */}
                  <Claps
                    ItemId={item.Id}
                    ItemType={ClapsItemTypeEnum.Product}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: IAppState, ownProps: any) => ({
  products: getProducts(state.productsState)
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadData: LoadProductsAction
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
