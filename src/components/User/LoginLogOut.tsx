import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogOutAction } from "src/actions/UserAction";
import { IUserInfo } from "src/Entities/Interfaces";
import { getUserInfo, isLogined } from "src/reducers/UserReducer";
import { IAppState } from "src/Store/store";
import { appStore } from "src/Store/store";

interface ILogInOutProps {
  IsLogined: boolean;
  UserInfo: IUserInfo;
}

class LoginLogOut extends React.Component<ILogInOutProps, {}> {
  constructor(props: ILogInOutProps) {
    super(props);
    this.LogOut = this.LogOut.bind(this);
  }

  public LogOut() {
    appStore.dispatch(LogOutAction());
  }

  public render() {
    const userInfo = this.props.UserInfo;
    if (this.props.IsLogined && userInfo) {
      return (
        <div className="log-in-log-out-container">
          <span className="user-icon-container">
            <span>{userInfo!.FullName}</span>
          </span>
          <span>
            <NavLink to="/" onClick={this.LogOut} className="log-out-link">
              خروج
            </NavLink>{" "}
          </span>
        </div>
      );
    } else {
      return (
        <div className="log-in-log-out-container">
          <NavLink to="/Login" className="log-in-link">
            ورود{" "}
          </NavLink>
          {" | "}
          <NavLink to="/Register" className="log-in-link">
            ثبت نام{" "}
          </NavLink>{" "}
        </div>
      );
    }
  }
}

const mapStateToProps = (state: IAppState) => ({
  IsLogined: isLogined(state.userState),
  UserInfo: getUserInfo(state.userState)
});

export default connect(mapStateToProps)(LoginLogOut);
