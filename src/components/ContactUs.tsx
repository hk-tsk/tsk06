import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { SendContactUsAction } from "src/actions/contactusAction";
import { getContactusSent } from "src/reducers/ContacUsReducer";
import { IFormState } from "src/Store/AllStates";
import { IAppState } from "src/Store/store";
import { ClearText } from "src/Utilities/textConvertor";
import {
  EmailFieldValidator,
  RequiredFieldValidator
} from "src/Utilities/Validators";
import "../styles/ContactUs.scss";

interface IContacUsProps {
  Sent: boolean;
  Send: (name: string, email: string, des: string) => void;
}

interface IContacUsState extends IFormState {
  Name: string;
  Email: string;
  Desc: string;
}
class ContactUs extends React.Component<IContacUsProps, IContacUsState> {
  constructor(props: IContacUsProps) {
    super(props);
    this.state = {
      Desc: "",
      Email: "",
      formErrors: {},
      formValid: false,
      // tslint:disable-next-line: object-literal-sort-keys
      Name: ""
    };
    this.Send = this.Send.bind(this);
    this.Validate = this.Validate.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.changeHanhleing = this.changeHanhleing.bind(this);
    this.blurHandlingForDesc = this.blurHandlingForDesc.bind(this);
  }

  public changeHanhleing(event: React.ChangeEvent<HTMLInputElement>) {
    const nameCtrl = event.target.name;
    switch (nameCtrl) {
      case "name":
        this.setState({ Name: event.target.value });
        this.validateField("name", this.state.Name);
        break;
      case "email":
        this.setState({ Email: event.target.value });
        this.validateField("email", this.state.Email);
        break;
      case "desc":
        this.setState({ Desc: event.target.value });
        this.validateField("desc", this.state.Desc);
        break;
      default:
        break;
    }
  }

  public blurHandlingForDesc(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ Desc: event.target.value });
    this.validateField("desc", this.state.Name);
  }

  public Send() {
    if (this.Validate()) {
      this.props.Send(
        this.state.Name,
        this.state.Email,
        ClearText(this.state.Desc)
      );
    }
  }

  public render() {
    document.title = "Countact us";
    if (this.props.Sent) {
      return (
        <div className="contactus-container ">
          <div className="contactus-siderbar">
            <div className="contactus-siderbar-background-back" />
            <div className="contactus-siderbar-background-front" />
            <div className="contactus-siderbar-content">تماس با ما</div>
          </div>
          <div className="contactus-view">
            <div className="view-col">
              <div className="contact-info center-content">
                <p>از ارسال نظرات و پیشنهادات شما متشکر هستیم.</p>

                <img
                  alt="contact us img"
                  src={process.env.PUBLIC_URL + "/images/contact.gif"}
                  className="contact_us_img"
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="contactus-container ">
          <div className="contactus-siderbar  pics">
            {/* <div className="contactus-siderbar-background-back" /> */}
            {/* <div className="contactus-siderbar-background-front" /> */}
            <div className="contactus-siderbar-content">تماس با ما</div>
          </div>
          <div className="contactus-view">
            {/* <div className="view-col">
            <img
              alt="contact us img"
              src={process.env.PUBLIC_URL + "/images/contact.gif"}
              className="contact_us_img"
            />
            <h4>بخش آموزش</h4>
            <p>ایران، تهران</p>
            <p>WebSite : www.taskSources.com</p>
          </div> */}
            <div className="view-col">
              <div className="contact-info">
                <div className="desc-top">
                  لطفا از طریق فرم زیر نظرات و پیشنهادات خود را برای ما ارسال
                  نمایید.
                </div>
                <div className="form-group">
                  {/* <label>
                    نام و نام خانوادگی */}
                  <input
                    name="name"
                    className={
                      "form-control " +
                      // tslint:disable-next-line: no-string-literal
                      this.errorClass("name")
                    }
                    onChange={this.changeHanhleing}
                    // onBlur={this.blurHandlingForName}
                    type="text"
                    placeholder="نام و نام خانوادگی"
                  />
                  {/* </label> */}
                </div>
                <div className="form-group">
                  {/* <label>
                    ایمیل */}
                  <input
                    className={
                      "form-control ltr-field " +
                      // tslint:disable-next-line: no-string-literal
                      this.errorClass("email")
                    }
                    type="email"
                    name="email"
                    // onBlur={this.blurHandlingForEmail}
                    onChange={this.changeHanhleing}
                    placeholder="ایمیل"
                  />
                  {/* </label> */}
                </div>
                <div className="form-group">
                  {/* <label>
                    توضیحات */}
                  <textarea
                    className={
                      "form-control " +
                      // tslint:disable-next-line: no-string-literal
                      this.errorClass("desc")
                    }
                    rows={3}
                    onChange={this.blurHandlingForDesc}
                    placeholder="توضیحات خود را وارد نمایید"
                  />
                  {/* </label> */}
                </div>
                <div className="form-group">
                  <input
                    type="button"
                    id="sendBtn"
                    value="ارسال"
                    onClick={this.Send}
                  />
                </div>
                <div className="form-group">
                  {this.state && this.state.formErrors
                    ? Object.keys(this.state.formErrors).map((error, index) => {
                        return (
                          <div key={index} className="error">
                            {this.state.formErrors[error].errorMsg}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="contactus-siderbar-end">
            <div className="pics" />
          </div>
        </div>
      );
    }
  }

  public Validate() {
    this.validateField("name", this.state.Name);
    this.validateField("email", this.state.Email);
    this.validateField("desc", this.state.Desc);
    return this.state.formValid;
  }

  private validateField(fieldName: string, value: string) {
    const fieldValidationErrors = this.state.formErrors;
    switch (fieldName) {
      case "email":
        const emailValidator = EmailFieldValidator(value, "ایمیل");
        fieldValidationErrors[fieldName] = emailValidator;

        break;

      case "name":
        const nameValidator = RequiredFieldValidator(
          value,
          "نام و نام خانوادگی"
        );
        fieldValidationErrors[fieldName] = nameValidator;

        break;
      case "desc":
        const descValidator = RequiredFieldValidator(value, "توضیحات");
        fieldValidationErrors[fieldName] = descValidator;
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors }, this.validateForm);
  }

  private validateForm() {
    let result = true;
    const errors = this.state.formErrors;
    // tslint:disable-next-line: forin
    for (const item in errors) {
      if (!errors[item].isValid) {
        result = false;
        break;
      }
    }

    this.setState({
      formValid: result
    });
  }

  private errorClass(field: string) {
    const errors = this.state.formErrors;
    const error = errors && errors[field] ? errors[field].errorMsg : "";
    return error.length === 0 ? "" : "invalid";
  }
}

const mapStateToProps = (state: IAppState) => ({
  Sent: getContactusSent(state.contactusState)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      Send: SendContactUsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
