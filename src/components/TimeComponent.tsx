import * as React from 'react'
interface ITimeState{
   time:string;
}
export default class TimeComponent extends React.Component<{},ITimeState> {
    private static interval: any;
   
    public componentDidMount() {
        const that = this;

        TimeComponent.interval = setInterval(() => {
            that.setTime();
        }, 1000);
    }
    public componentWillUnmount() {
        if (TimeComponent.interval) {
            delete TimeComponent.interval;
        }
    }
    public render() {
        return (<div className="time-container">{this.state ? this.state.time: ""}</div>)
    }
    private setTime() {
        this.setState({time:new Date().toLocaleTimeString()});
    }
}