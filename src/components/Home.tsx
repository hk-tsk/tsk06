import * as React from "react";
import Brands from "./Brands";
import Courses from "./Courses";
import Intro from "./Intro";
// import Products from "./shop/Products";

export default class Home extends React.Component {
  public render() {
    document.title = "Programming Training Site";

    return (
      <div className="home-container">
        <Intro />
        <div className="down-space intro-space" />
        <Courses />
        {/* <div className="course-space-moving">
          <h1>فروشگاه</h1>
          <h6>در دست ساخت</h6>
        </div>
        <Products /> */}
        <Brands />
        <div className="down-space brand-space" />
      </div>
    );
  }
}
