import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import {
  ResetLogErrorAction,
  UserRegisterAction
} from "src/actions/UserAction";
import { IRegisterInfo } from "src/Entities/Interfaces";
import {
  errorMessage,
  getLoginLoading,
  getSucceded
} from "src/reducers/UserReducer";
import { IAppState } from "src/Store/store";
import {
  EmailFieldValidator,
  RequiredFieldValidator,
  SameFieldValidator
} from "src/Utilities/Validators";
import "../../styles/User.scss";

interface IRegisterState {
  formErrors: {
    confirmpassword: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
  };
  formValid: boolean;
  confirmpasswordValid: boolean;
  passwordValid: boolean;
  emailValid: boolean;
  nameValid: boolean;
  lastnameValid: boolean;
}
interface IRegisterProps {
  Register: (userinfo: IRegisterInfo) => void;
  IsSucceded: boolean;
  Loading: boolean;
  ResetError: () => void;
  Error: string;
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
  private EmailRef?: HTMLInputElement;
  private PasswordRef?: HTMLInputElement;
  private ConfirmPasswordRef?: HTMLInputElement;
  private NameRef?: HTMLInputElement;
  private LastNameRef?: HTMLInputElement;
  private PhoneNumberRef?: HTMLInputElement;

  constructor(props: IRegisterProps) {
    super(props);
    this.Register = this.Register.bind(this);
    this.handleInputValidate = this.handleInputValidate.bind(this);
    this.validateField = this.validateField.bind(this);
    this.Validate = this.Validate.bind(this);

    this.state = {
      confirmpasswordValid: true,
      emailValid: false,
      formErrors: {
        confirmpassword: "",
        email: "",
        lastname: "",
        name: "",
        password: ""
      },
      formValid: false,
      passwordValid: false,
      // tslint:disable-next-line: object-literal-sort-keys
      nameValid: false,
      lastnameValid: false
    };
    this.props.ResetError();
  }
  public Register() {
    // if (this.UserNameRef !== undefined && this.PasswordRef !== undefined) {
    if (this.Validate()) {
      const userinfo: IRegisterInfo = {
        ConfirmPassword: this.ConfirmPasswordRef!.value,
        Email: this.EmailRef!.value,
        LastName: this.LastNameRef!.value,
        Name: this.NameRef!.value,
        Password: this.PasswordRef!.value,
        PhoneNumber: this.PhoneNumberRef!.value
      };
      this.props.Register(userinfo);
    }
    // }
  }

  public render() {
    if (this.props.IsSucceded) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="Register-Container">
          <form>
            <div className="form-group">
              <label> نام :</label>
              <input
                type="input"
                name="name"
                className={this.errorClass(this.state.formErrors.name)}
                onChange={this.handleInputValidate}
                ref={ele => (ele !== null ? (this.NameRef = ele) : null)}
                placeholder=" نام را وارد نمایید"
              />
            </div>
            <div className="form-group">
              <label> نام خانوادگی :</label>
              <input
                type="input"
                name="lastname"
                className={this.errorClass(this.state.formErrors.lastname)}
                onChange={this.handleInputValidate}
                ref={ele => (ele !== null ? (this.LastNameRef = ele) : null)}
                placeholder=" نام خانوادگی را وارد نمایید"
              />
            </div>
            <div className="form-group">
              <label> ایمیل :</label>
              <input
                type="input"
                name="email"
                className={this.errorClass(this.state.formErrors.email)}
                onChange={this.handleInputValidate}
                ref={ele => (ele !== null ? (this.EmailRef = ele) : null)}
                placeholder=" ایمیل را وارد نمایید"
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
              <label>تکرار رمز عبور :</label>
              <input
                type="password"
                name="confirmpassword"
                className={this.errorClass(
                  this.state.formErrors.confirmpassword
                )}
                placeholder="*******"
                onChange={this.handleInputValidate}
                ref={ele =>
                  ele != null ? (this.ConfirmPasswordRef = ele) : null
                }
              />
            </div>
            <div className="form-group">
              <label> شماره تلفن :</label>
              <input
                type="input"
                name="phonenumber"
                // className={this.errorClass(this.state.formErrors.lastname)}
                onChange={this.handleInputValidate}
                ref={ele => (ele !== null ? (this.PhoneNumberRef = ele) : null)}
                placeholder=" شماره تلفن را وارد نمایید"
              />
            </div>
            <div className="form-group">
              <input
                type="button"
                value="ثبت نام"
                disabled={this.LoginDisabled()}
                onClick={this.Register}
              />
            </div>

            <div className="form-group">
              {Object.keys(this.state.formErrors)
                .filter(c => this.state.formErrors[c] !== "")
                .map((error, index) => {
                  return (
                    <div key={index} className="error">
                      {index + 1 + ". " + this.state.formErrors[error]}
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
    return this.props.IsSucceded || this.props.Loading;
  }
  public Validate() {
    const email = this.EmailRef !== undefined ? this.EmailRef.value : "";
    const password =
      this.PasswordRef !== undefined ? this.PasswordRef.value : "";
    const confirmpassword =
      this.ConfirmPasswordRef !== undefined
        ? this.ConfirmPasswordRef.value
        : "";
    const name = this.NameRef !== undefined ? this.NameRef.value : "";
    const lastname =
      this.LastNameRef !== undefined ? this.LastNameRef.value : "";

    this.validateField("name", name);
    this.validateField("lastname", lastname);
    this.validateField("email", email);
    this.validateField("password", password);
    this.validateField("confirmpassword", confirmpassword,password);

    return this.state.formValid;
  }

  private errorClass(error: string) {
    return error.length === 0 ? " ltr-field " : "ltr-field invalid";
  }
  private handleInputValidate(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    this.validateField(name, value);
  }
  private validateField(
    fieldName: string,
    value: string,
    value1: string = ""
  ) {
    const fieldValidationErrors = this.state.formErrors;
    let isemailValid = this.state.emailValid;
    let isnameValid = this.state.nameValid;
    let islastnameValid = this.state.lastnameValid;
    let ispasswordValid = this.state.passwordValid;
    let isconfirmpasswordValid = this.state.confirmpasswordValid;

    switch (fieldName) {
      case "email":
        const result = RequiredFieldValidator(value, "ایمیل ");
        const resultE = EmailFieldValidator(value, "ایمیل ");

        isemailValid = result.isValid && resultE.isValid;
        fieldValidationErrors.email = isemailValid
          ? ""
          : result.errorMsg + " " + resultE.errorMsg;
        break;
      case "name":
        const nameresult = RequiredFieldValidator(value, "نام ");
        isnameValid = nameresult.isValid;
        fieldValidationErrors.name = nameresult.errorMsg;
        break;
      case "lastname":
        const lastnameresult = RequiredFieldValidator(value, "نام خانوادگی ");
        islastnameValid = lastnameresult.isValid;
        fieldValidationErrors.lastname = lastnameresult.errorMsg;
        break;
      case "password":
        const resultP = RequiredFieldValidator(value, "رمز عبور");
        ispasswordValid = resultP.isValid;
        fieldValidationErrors.password = resultP.errorMsg;
        break;
      case "confirmpassword":
        const resultCP = RequiredFieldValidator(value, "تکرار رمز عبور");
        const resultSame = SameFieldValidator(
          value,
          value1,
          "تکرار رمز عبور",
          "رمز عبور"
        );
        isconfirmpasswordValid = resultCP.isValid && resultSame.isValid;
        fieldValidationErrors.password = resultCP.errorMsg + " " + resultSame.errorMsg;
        break;
      default:
        break;
    }

    this.setState(
      {
        confirmpasswordValid: isconfirmpasswordValid,
        emailValid: isemailValid,
        formErrors: fieldValidationErrors,
        lastnameValid: islastnameValid,
        nameValid: isnameValid,
        passwordValid: ispasswordValid,
      },
      this.validateForm
    );
  }

  private validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confirmpasswordValid &&
        this.state.nameValid &&
        this.state.lastnameValid &&
        this.state.confirmpasswordValid
    });
  }
}

const mapStateToProps = (state: IAppState) => ({
  Error: errorMessage(state.userState),
  IsSucceded: getSucceded(state.userState),
  Loading: getLoginLoading(state.userState)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      Register: UserRegisterAction,
      ResetError: ResetLogErrorAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
