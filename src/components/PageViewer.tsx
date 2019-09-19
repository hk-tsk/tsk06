import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InitPageAction } from 'src/actions/pageviewerAction';
import { imageManagment } from 'src/apis/ImageApi';
import { IPageViewProps } from 'src/Entities/Interfaces';
import { getCourses } from 'src/reducers/CoursesReducer';
import { getPageInfo, getSelectedCategoryTitlePage } from 'src/reducers/PageViewerReducer';
import { IAppState } from 'src/Store/store';
import '../styles/PageViewer.scss'
import Content from './Content';


class PageViewer extends React.Component<IPageViewProps>{

        constructor(props: IPageViewProps) {
                super(props);
        }

        public componentWillMount() {
                this.props.InitPage(this.getPageName());
        }

        public getPageName() {
                return this.props.match.params.Name;
        }

        public getPageCategory() {
                return this.props.match.params.Category || "";
        }

        public CategoryIsSelected(caterory: string) {
                return this.getPageCategory() === caterory;
        }

        public render() {
                const name = this.getPageName();
                const item = this.props.courses.find(c => c.Name === name);
                const caItems: JSX.Element[] = [];
                let bodyContext = "not Found.";
                if (item) {
                        document.title = item.Title;
                        bodyContext = item.IntroInfo;
                }

                return (<div className="page-viewer-container">
                        <div className="page-viewer-header">
                                <h3 className="page-viewer-title">{item ? item.Title : ""}
                                </h3>
                                <img className="page-viewer-header-img"
                                        src={imageManagment.GetImageUrl(item && item.Img ? item.Img : "NotSetImgCourse.svg", "Course")}
                                        alt="img" />
                        </div>
                        <div className="page-viewer-wrapper">
                                <div className="page-viewer-sidebar">فهرست مطالب
                                        <ul>
                                                {
                                                        caItems

                                                }
                                        </ul>
                                </div>

                                <div className="page-viewer-body">

                                        <h4> {this.props.SelectedCategoryTitle}</h4>
                                        <Content Name={this.getPageName()}
                                                CategoryName={this.getPageCategory()} DefaultText={bodyContext} />
                                </div>
                                {!this.props.Item.loaded ? <div className="loading">loading...</div> : []}
                        </div>

                </div>)
        }
}

const mapStateToProps = (state: IAppState, ownProps: any) => (
        {
                Item: getPageInfo(state.pagesState),
                courses: getCourses(state.coursesState),
                // tslint:disable-next-line: object-literal-sort-keys
                SelectedCategoryTitle: getSelectedCategoryTitlePage(state.pagesState, (ownProps as IPageViewProps).match.params.Category || ""),
        }
)

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        InitPage: InitPageAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PageViewer)