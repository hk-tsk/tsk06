import * as React from "react";
import NotificationApi from "src/apis/NotificationApi";
import "../styles/User.scss";
import {
  askNotificationPermission,
  createNotificationSubscription,
  getUserSubscription,
  isPushNotificationSupported,
  registerServiceWorker,
  sendNotification,
  unregister
} from "./../notifi_scripts/pushNotification.js";

interface INotifiState {
  isPushNotificationSupported: boolean;
  userConsent: string;
}
const service = new NotificationApi();

export default class Notifi extends React.Component<{}, INotifiState> {
  private pushSubscription: void | PushSubscription;

  constructor(props: any) {
    super(props);
    this.Login = this.Login.bind(this);
    this.state = {
      isPushNotificationSupported: false,
      userConsent: ""
    };
  }
  public componentDidMount() {
    // tslint:disable-next-line: no-console
    console.log("init");
    if (isPushNotificationSupported()) {
      this.setState({ isPushNotificationSupported: true });
      unregister();
    }
  }
  public Login() {
    const that = this;
    // tslint:disable-next-line: no-console
    console.log(1);
    if (this.state.isPushNotificationSupported) {
      // tslint:disable-next-line: no-console
      console.log(2);
      registerServiceWorker().then(r => {
        // tslint:disable-next-line: no-console
        console.log(3, r);
        askNotificationPermission().then(perm => {
          this.setState({ userConsent: perm.toString() });
        });
        // tslint:disable-next-line: no-console
        console.log(4);
        getUserSubscription().then(pushSubscription => {
          // tslint:disable-next-line: no-console
          console.log(22222, pushSubscription, this.pushSubscription);

          if (pushSubscription === null || pushSubscription === undefined) {
            createNotificationSubscription().then(sub => {
              that.pushSubscription = sub;
              // tslint:disable-next-line: no-console
              console.log(1111111, sub);

              if (sub instanceof PushSubscription) {
                // tslint:disable-next-line: no-console
                console.log("call api");

                service.SendSubscription(sub).then(() => {
                  // tslint:disable-next-line: no-console
                  console.log(6565656565);

                  sendNotification();
                });
              }
            });
          } else {
            // tslint:disable-next-line: no-console
            console.log(777777777777, pushSubscription);
            sendNotification();
          }
        });
        // tslint:disable-next-line: no-console
        console.log(6);
      });
    } else {
      this.setState({ isPushNotificationSupported: true });
    }
  }

  public render() {
    return (
      <div className="log-in-Container">
        <form>
          <div className="form-group">
            isPushNotificationSupported:{" "}
            {this.state.isPushNotificationSupported}
          </div>
          <div className="form-group">
            userConsent: {this.state.userConsent}
          </div>
          <div className="form-group">
            <input type="button" value="check" onClick={this.Login} />
          </div>
        </form>
      </div>
    );
  }
}
