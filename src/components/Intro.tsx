import * as React from "react";
// import ImageComponent from "./ImageComponent";
export default class Intro extends React.Component {
  public render() {
    const info = {
      Img: "elearning.png",
      PreTitle: "آموزش مجازی",
      Title: "برنامه نویسی"
    };

    return (
      <div className="intro-container">
        <div className="intro-image-container">
        <img className=" intro-image "
                    // tslint:disable-next-line: jsx-no-lambda
                    onError={(elem) => elem.currentTarget.className = "img-not-found"}
                    src={process.env.PUBLIC_URL + '/images/intro.svg'} alt={info.Title} />
          {/* {
            <ImageComponent
              name={info.Img}
              category="Shared"
              alt={info.Title}
              imgClassName="intro-image"
            />
          } */}
        </div>
        <div className="intro-content">
          <h3 className="show-on-scroll">{info.PreTitle}</h3>
          <h1 className="show-on-scroll">{info.Title}</h1>
        </div>
      </div>
    );
  }
}
