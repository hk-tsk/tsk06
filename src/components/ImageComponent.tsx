import * as React from 'react'
import PagesApi from 'src/apis/PagesApi';

interface IImageProps {
    name: string,
    category: string,
    alt: string,
    imgClassName: string,
}

export default class ImageComponent extends React.Component<IImageProps> {
    private pagesApi = new PagesApi();

    public render() {
        const imgSrc = this.pagesApi.GetImageUrl(this.props.name, this.props.category);
        const alt = this.props.alt || this.props.name;
        return (<div className={this.props.imgClassName} ><img className="show-on-scroll"
            // tslint:disable-next-line: jsx-no-lambda
            onError={(elem) => elem.currentTarget.className = "img-not-found"}
            src={imgSrc} alt={alt} /></div>)
    }
}