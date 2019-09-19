import * as React from 'react'
import { ApiException } from 'src/apis/ApiException';
import { imageManagment } from 'src/apis/ImageApi';

interface IImageProps {
    name: string,
    category: string,
    alt: string,
    imgClassName: string,
    onMouseMove?: (event: React.MouseEvent<HTMLImageElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}
interface IImageState {
    img: string,
    loaded: boolean
}
export default class ImageComponent extends React.Component<IImageProps, IImageState> {
    private hasDisposed: boolean;

    constructor(props: IImageProps) {
        super(props);
        this.state = {
            img: "",
            loaded: false,
        }
        this.hasDisposed = false;

        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    public componentWillMount() {
        this.loadImages();
    }

    public onMouseMoveHandler(event: React.MouseEvent<HTMLImageElement>) {
        if (this.props.onMouseMove) {
            this.props.onMouseMove(event);
        }
    }

    public onClickHandler(event: React.MouseEvent<HTMLImageElement>) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
    public componentWillUnmount() {
        this.hasDisposed = true;
    }
    // public render111() {
    //     const imgSrc = imageManagment.GetImageUrl(this.props.name, this.props.category);
    //     const alt = this.props.alt || this.props.name;
    //     return (<div className={this.props.imgClassName} ><img className="show-on-scroll"
    //         // tslint:disable-next-line: jsx-no-lambda
    //         onError={(elem) => elem.currentTarget.className = "img-not-found"}
    //         src={imgSrc} alt={alt} /></div>)
    // }
    public render() {
        const imgSrc = this.state.img;
        const alt = this.props.alt || this.props.name;
        if (this.state.loaded && imgSrc.length > 0) {
            return (
                <div className={this.props.imgClassName} ><img className="show-on-scroll"
                    // tslint:disable-next-line: jsx-no-lambda
                    onError={(elem) => elem.currentTarget.className = "img-not-found"}
                    onMouseMove={this.onMouseMoveHandler}
                    onClick={this.onClickHandler}
                    src={imgSrc} alt={alt} /></div>)
        } else {
            return (<div className={this.props.imgClassName} >
                <div className="img-loading" />
            </div>)
        }

    }
    private async loadImages() {
        const item = await imageManagment.GetImages(this.props.name, this.props.category);
        if (this.hasDisposed) {
            return;
        }
        if (item instanceof ApiException) {
            this.setState({ img: "", loaded: false });

        } else {
            this.setState({ img: item, loaded: true });

        }
    }

}