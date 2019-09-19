import * as React from 'react'
import {imageManagment} from 'src/apis/ImageApi';

interface IBrabdState {
    imgs: any[];// JSX.Element[]
}
export default class Brands extends React.Component<{}, IBrabdState> {
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
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state = {
            imgs: []
        }
    }

    public async componentWillMount() {
        const items = await this.loadImages();
        Promise.all(items).then((data: any[]) => {
            this.setState({ imgs: data });
        });
    }

    public render() {
        const brandList = this.state.imgs || [];
        if (brandList.length > 0) {
            return (<div className="brands-container">
                {
                    this.brands.map((brand, index) => {

                        return (<img key={index} src={brandList.find(c=>c.name === brand.Name).data}
                            // tslint:disable-next-line: jsx-no-lambda
                            onError={(elem) => elem.currentTarget.className = "img-not-found"} className="course-item-img" alt={brand.Name} />);
                    })
                }
            </div>)
        } else {
            return (<div className="brands-container">
                <div className="loading" />
            </div>)
        }

    }

    private async loadImages() {
        return this.brands.map(async (brand, index) => {
            const item = await imageManagment.GetImages(brand.ImageName, "Brands");
            return { name: brand.Name, data: item}
        });
    }
}