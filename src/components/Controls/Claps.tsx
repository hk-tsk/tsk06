import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ChangeClapsActionBase } from "src/actions/ClapsAction";
import { IClapsItem } from "src/Entities/Interfaces";
import { getClaps, getClapsLoaded } from "src/reducers/ClapsReducer";
import { appStore, IAppState } from "src/Store/store";

interface IClapsProps {
  ApplyChange?: (
    id: number,
    itemType: string,
    added: boolean,
    user: string
  ) => void;
  Claps?: IClapsItem;
  ItemId: number;
  ItemType: string;
  Loaded?: boolean;
}

class Claps extends React.Component<IClapsProps> {
  constructor(props: IClapsProps) {
    super(props);
    this.ApplyClaps = this.ApplyClaps.bind(this);
  }

  public ApplyClaps() {
    const user = appStore.getState().userState.userName;

    if (!user) {
      alert("ابتدا به حساب کاربری خود وارد شوید");
      return;
    }

    if (this.props.ApplyChange) {
      this.props.ApplyChange(
        this.props.ItemId,
        this.props.ItemType,
        true,
        appStore.getState().userState.userName
      );
    }
  }
  public render() {
    const ClapsCount = this.props.Claps ? this.props.Claps.ClapsCount : 0;
    // if (item) {
    return (
      <div className="claps-container">
        <span>{ClapsCount || 0}</span>
        <img
          // tslint:disable-next-line: jsx-no-lambda
          onError={elem => (elem.currentTarget.className = "img-not-found")}
          src={process.env.PUBLIC_URL + "/images/claps.svg"}
          alt="claps"
          onClick={this.ApplyClaps}
        />
      </div>
    );
    // } else {
    //   return <div className="claps-container" />;
    // }
  }
}

const mapStateToProps = (state: IAppState, ownProps: IClapsProps) => ({
  Claps: getClaps(state.clapsState, ownProps.ItemId, ownProps.ItemType),
  Loaded: getClapsLoaded(state.clapsState)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      ApplyChange: ChangeClapsActionBase
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Claps);
