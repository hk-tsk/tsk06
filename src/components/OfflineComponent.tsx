import "bootstrap/scss/bootstrap.scss";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAppIsOffline } from 'src/reducers/appReducer';
import { IAppState } from "src/Store/store";
import { APPIsOffline, APPIsOnline } from "../actions/appAction";
import { IAppMainState } from "../Store/AllStates";

interface IOfflineComponentProps {
  appIsOffline?: boolean;
  changeToOffline?: () => void;
  changeToOnline?: () => void;
}

class OfflineComponent extends React.Component<
  IOfflineComponentProps,
  IAppMainState
> {
  constructor(props: IOfflineComponentProps) {
    super(props);
    this.AppIsOffEvent = this.AppIsOffEvent.bind(this);
    this.AppIsOnEvent = this.AppIsOnEvent.bind(this);
  }

  public AppIsOffEvent() {
    // tslint:disable-next-line: no-console
    console.log("AppIsOffEvent");
    if (this.props.changeToOffline) {
      this.props.changeToOffline();
    }
  }

  public AppIsOnEvent() {
    // tslint:disable-next-line: no-console
    console.log("AppIsOnEvent");

    if (this.props.changeToOnline) {
      this.props.changeToOnline();
    }
  }

  public componentWillmount() {
    window.addEventListener("offline", () => this.AppIsOffEvent());
    window.addEventListener("online", () => this.AppIsOnEvent());
  }

  public componentwillunmount() {
    window.removeEventListener("offline", this.AppIsOffEvent);
    window.removeEventListener("online", this.AppIsOnEvent);
  }
  public render() {
    return (
      <div
        className={this.props.appIsOffline ? "App-Is-Offline" : "App-Is-Online"}
      >
        Note: Your device is offline.
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: IOfflineComponentProps) =>
  bindActionCreators(
    {
      changeToOffline: APPIsOffline,
      changeToOnline: APPIsOnline
    },
    dispatch
  );

const mapStateToProps = (state: IAppState) => ({
  appIsOffline: getAppIsOffline(state.appMainState)
});
export default connect(mapStateToProps, mapDispatchToProps)(OfflineComponent);
