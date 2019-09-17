import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { GetContent } from 'src/actions/ContentAction';
import { ContentType } from 'src/Entities/Enums';
import { getContent, getContentLoaded } from 'src/reducers/ContentReducer';
import { IAppState } from 'src/Store/store';
import { ApplyLineStyle } from 'src/Utilities/textConvertor';
import { IContent } from '../Entities/Interfaces'
import '../styles/Content.scss'

interface IContentProp {
    Name: string,
    CategoryName: string,
    CurrentContent: IContent[]
    DefaultText: string,
    Loaded: boolean,
    LoadData: (name: string, category: string) => void;
}

class Content extends React.Component<IContentProp, {}>{

    public componentWillMount() {
        this.props.LoadData(this.props.Name, this.props.CategoryName);
    }

    public componentWillReceiveProps(newProps: IContentProp) {
        if (this.props.CategoryName !== newProps.CategoryName) {
            this.props.LoadData(this.props.Name, newProps.CategoryName);
        }

    }

    public GetData(): IContent[] {
        if (this.props.CategoryName) {
            return this.props.CurrentContent;
        } else {
            return [{
                ContentText: this.props.DefaultText,
                ContentType: ContentType.Paragraph,
            }]
        }
    }

    public CodeDesign(code: string) {
        const lines = (code || "").split("\n");

        return lines.map((line, index) => {
            const danf = {
                __html: ApplyLineStyle(line),
            }
            return (<p className="code-line" key={index}><span className="code-line-number">{index + 1}</span><span dangerouslySetInnerHTML={danf} /></p>)
        })
    }

    public render() {
        const contentData = this.GetData();
        const content = contentData.map((c, index) => {
            if (c.ContentType === ContentType.Image) {
                return <img key={index} className="content-img" src={c.ContentText} />
            }
            else if (c.ContentType === ContentType.Code) {
                return <p key={index} className="content-code">{this.CodeDesign(c.ContentText)}</p>
            } else {
                return <p key={index} className="content-content">{c.ContentText}</p>
            }
        });

        return (<div className="content-container">
            {
                content
            }

            {!this.props.Loaded ? <div className="loading">.</div> : []}
        </div>)
    }
}

const mapPropsToState = (state: IAppState) => ({
    CurrentContent: getContent(state.contentState),
    Loaded: getContentLoaded(state.contentState),
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    LoadData: GetContent
}, dispatch);

export default connect(mapPropsToState, mapDispatchToProps)(Content);