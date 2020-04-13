import * as React from "react";

export default class AboutUs extends React.Component {
  public render() {
    document.title = "About Learning Site";

    return (
      <div className="about-us-container">
        <p className="about-us-god-title">به نام خدا</p>
        <p className="about-us-desc">
          امروزه استفاده از ابزارهای برنامه نویسی جدید اجتناب ناپذیر می باشد و
          نیاز است تا در کمترین زمان بتوان این ابزارها را آموخت و در کار استفاده
          نمود.
        </p>
        <p className="about-us-desc">
          ما بر آن شدیم تا بخشی از این نیاز برنامه نویسان و مجریان برنامه های
          کامپیوتری را مرتفع کنیم.
        </p>
        <div className="about-us-image">
          <img
            // tslint:disable-next-line: jsx-no-lambda
            onError={elem => (elem.currentTarget.className = "img-not-found")}
            src={process.env.PUBLIC_URL + "/images/elearning.png"}
            alt="aboutUs"
          />
        </div>
      </div>
    );
  }
}
