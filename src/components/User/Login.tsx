import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { LoginAction, ResetLogErrorAction } from "src/actions/UserAction";
import {
  errorMessage,
  getLoginLoading,
  getUser,
  isLogined
} from "src/reducers/UserReducer";
import { IAppState } from "src/Store/store";
import { RequiredFieldValidator } from "src/Utilities/Validators";
import "../../styles/User.scss";

interface ILogInState {
  formErrors: { username: string; password: string };
  formValid: boolean;
  passwordValid: boolean;
  usernameValid: boolean;
}
interface ILogInProps {
  DoLogIn: (username: string, password: string) => void;
  IsLogined: boolean;
  Loading: boolean;
  ResetError: () => void;
  UserName: string;
  Error: string;
}

class Login extends React.Component<ILogInProps, ILogInState> {
  private UserNameRef?: HTMLInputElement;
  private PasswordRef?: HTMLInputElement;

  constructor(props: ILogInProps) {
    super(props);
    this.Login = this.Login.bind(this);
    this.handleInputValidate = this.handleInputValidate.bind(this);
    this.validateField = this.validateField.bind(this);
    this.Validate = this.Validate.bind(this);

    this.state = {
      formErrors: { username: "", password: "" },
      formValid: false,
      passwordValid: false,
      usernameValid: false
    };
    this.props.ResetError();
  }
  public Login() {
    if (this.UserNameRef !== undefined && this.PasswordRef !== undefined) {
      if (this.Validate()) {
        this.props.DoLogIn(this.UserNameRef.value, this.PasswordRef.value);
      }
    }
  }

  public render() {
    if (this.props.IsLogined) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="log-in-Container">
          <div className="log-in-text">
            <span>آیا هنوز ثبت نام نکرده اید؟</span>
            <NavLink to="/Register" className="register-link">
              ثبت نام{" "}
            </NavLink>{" "}
          </div>
          <form>
            <div className="form-group">
              <label>نام کاربری :</label>
              <input
                type="input"
                name="username"
                className={this.errorClass(this.state.formErrors.username)}
                onChange={this.handleInputValidate}
                ref={ele => (ele !== null ? (this.UserNameRef = ele) : null)}
                placeholder="نام کاربری را وارد نمایید"
              />
            </div>
            <div className="form-group">
              <label>رمز عبور :</label>
              <input
                type="password"
                name="password"
                className={this.errorClass(this.state.formErrors.password)}
                placeholder="*******"
                onChange={this.handleInputValidate}
                ref={ele => (ele != null ? (this.PasswordRef = ele) : null)}
              />
            </div>
            <div className="form-group">
              <input
                type="button"
                value="ورود"
                disabled={this.LoginDisabled()}
                onClick={this.Login}
              />
            </div>

            <div className="form-group">
              {Object.keys(this.state.formErrors).map((error, index) => {
                return (
                  <div key={index} className="error">
                    {this.state.formErrors[error]}
                  </div>
                );
              })}
              {this.props.Error !== "" ? (
                <div className="error">{this.props.Error}</div>
              ) : (
                []
              )}
            </div>
          </form>
        </div>
      );
    }
  }

  public LoginDisabled() {
    return this.props.IsLogined || this.props.Loading;
  }
  public Validate() {
    const username =
      this.UserNameRef !== undefined ? this.UserNameRef.value : "";
    const password =
      this.PasswordRef !== undefined ? this.PasswordRef.value : "";
    this.validateField("username", username);
    this.validateField("password", password);

    return this.state.formValid;
  }

  private errorClass(error: string) {
    return error.length === 0 ? "" : "invalid";
  }
  private handleInputValidate(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    this.validateField(name, value);
  }
  private validateField(fieldName: string, value: string) {
    const fieldValidationErrors = this.state.formErrors;
    let isusernameValid = this.state.usernameValid;
    let ispasswordValid = this.state.passwordValid;

    switch (fieldName) {
      case "username":
        const result = RequiredFieldValidator(value, "نام کاربری ");
        isusernameValid = result.isValid;
        fieldValidationErrors.username = result.errorMsg;
        break;

      case "password":
        const resultP = RequiredFieldValidator(value, "رمز عبور");
        ispasswordValid = resultP.isValid;
        fieldValidationErrors.password = resultP.errorMsg;
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        passwordValid: ispasswordValid,
        usernameValid: isusernameValid
      },
      this.validateForm
    );
  }

  private validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid
    });
  }
}

const mapStateToProps = (state: IAppState) => ({
  Error: errorMessage(state.userState),
  IsLogined: isLogined(state.userState),
  Loading: getLoginLoading(state.userState),
  UserName: getUser(state.userState)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      DoLogIn: LoginAction,
      ResetError: ResetLogErrorAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
