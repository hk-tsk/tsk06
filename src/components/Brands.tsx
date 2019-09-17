import * as React from 'react'
import PagesApi from 'src/apis/PagesApi';

const pagesApi = new PagesApi();

export default class Brands extends React.Component {

    private brands = [
        {
            ImageName: "Angular.png",
            Name: "Angular",
        },
        {
            ImageName: "VS.png",
            Name: "VisualStudio",
        },
        {
            ImageName: "React.png",
            Name: "React",
        },
        {
            ImageName: "js.png",
            Name: "Js",
        },
        {
            ImageName: "ts.png",
            Name: "TS",
        },
        {
            ImageName: "Vue.png",
            Name: "Vue",
        },
        {
            ImageName: "VSCode.png",
            Name: "VisualStudioCode",
        },
    ];

    public render() {

        return (<div className="brands-container">
            {
                this.brands.map((brand, index) => {
                    // return (<div key={index} className="brand-item">
                    //     <img src={pagesApi.GetImageUrl(brand.ImageName, "Brands")}
                    //         // tslint:disable-next-line: jsx-no-lambda
                    //         onError={(elem) => elem.currentTarget.className = "img-not-found"}

                    //         className="course-item-img" alt={brand.Name} /><span>{brand.Name}</span>
                    return (
                        <img key={index} src={pagesApi.GetImageUrl(brand.ImageName, "Brands")}
                            // tslint:disable-next-line: jsx-no-lambda
                            onError={(elem) => elem.currentTarget.className = "img-not-found"}

                            className="course-item-img" alt={brand.Name} />
                    );
                })
            }
        </div>)
    }
}