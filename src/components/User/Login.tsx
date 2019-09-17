import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { LoginAction } from 'src/actions/UserAction';
import { getUser, isLogined } from 'src/reducers/UserReducer';
import { IAppState } from 'src/Store/store';
import '../../styles/User.scss';

interface ILogInProps {
    DoLogIn: (username: string, password: string) => void;
    IsLogined: boolean;
    UserName: string;
}

class Login extends React.Component<ILogInProps>{

    constructor(props: ILogInProps) {
        super(props);
        this.Login = this.Login.bind(this);
    }

    public Login() {
        this.props.DoLogIn("userTest", "");
    }

    public render() {
        return (<div className="log-in-Container">
            <form>
                <div className="form-group">
                    <label>نام کاربری :</label>
                    <input type="input" placeholder="نام کاربری را وارد نمایید" />
                </div>
                <div className="form-group">
                    <label>رمز عبور :</label>
                    <input type="password" />
                </div>

                <input type="button" value="ورود" disabled={this.props.IsLogined} onClick={this.Login} />

            </form>
        </div>)
    }

}

const mapStateToProps = (state: IAppState) => ({
    IsLogined: isLogined(state.userState),
    UserName: getUser(state.userState),
})


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    DoLogIn: LoginAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login)