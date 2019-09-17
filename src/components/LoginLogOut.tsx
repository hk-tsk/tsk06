import * as React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogOutAction } from 'src/actions/UserAction';
import { getUser, isLogined } from 'src/reducers/UserReducer';
import { IAppState } from 'src/Store/store';
import { appStore } from 'src/Store/store';

interface ILogInOutProps {
    IsLogined: boolean,
    UserName: string,
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
        if (this.props.IsLogined) {
            return (<div className="log-in-log-out-container"><span> {this.props.UserName}</span><span><NavLink to="/" onClick={this.LogOut} className="log-out-link">خروج</NavLink> </span></div>)
        } else {
            return (<div className="log-in-log-out-container"><NavLink to="/Login" className="log-in-link">ورود کاربر</NavLink> </div>)
        }
    }

}

const mapStateToProps = (state: IAppState) => ({
    IsLogined: isLogined(state.userState),
    UserName: getUser(state.userState),
})

export default connect(mapStateToProps)(LoginLogOut);
