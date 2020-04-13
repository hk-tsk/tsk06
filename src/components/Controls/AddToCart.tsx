import * as React from "react";
import { Currency } from "src/Utilities/currency";

interface IAddToCardProps {
  Price: number;
  ProductId: number;
  Title: string;
  // Quantity: number;
}

export default class AddToCart extends React.Component<IAddToCardProps> {
  constructor(props: IAddToCardProps) {
    super(props);
    this.AddToCartEvent = this.AddToCartEvent.bind(this);
  }

  public AddToCartEvent() {
    // tslint:disable-next-line: no-console
    console.log(44, this.props);
  }

  public render() {
    const item = this.props;
    return (
      <div className="add-to-cart-container">
        <span className="add-to-cart-price-lable">قیمت :</span>
        <span className="add-to-cart-price"> {Currency(item.Price)}</span>
        <span className="add-to-cart-price-lable">ریال</span>
        <span
          className="add-to-cart-icon"
          title="افزودن یه سبد خرید"
          onClick={this.AddToCartEvent}
        />
      </div>
    );
  }
}
