import React, { Component } from 'react';
import {connect} from 'react-redux';

class Stopwatch extends Component {
    state = {
      status: false,
      runningTime: 0
    };

    componentDidMount(){
      this.props.attachTimerToogle(this.handleClick)
      this.props.attachTimerReset(this.handleReset)
    }
    handleClick = () => {
      this.setState(state => {
        if (state.status) {
          clearInterval(this.timer);
        } else {
          const startTime = Date.now() - this.state.runningTime;
          this.timer = setInterval(() => {
            this.setState({ runningTime: Math.floor((Date.now() - startTime)/1000) });
          }, 1000);
        }
        return { status: !state.status };
      });
    };
    handleReset = () => {
        clearInterval(this.timer); 
        this.setState({ runningTime: 0, status: false });
      };
    render() {
      const { runningTime } = this.state;
     
      return (
        <span>
         {runningTime}
        </span>
      );
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        attachTimerToogle: (toogleTimer)=> dispatch({type: 'attachTimerToogle', payload: toogleTimer}),
        attachTimerReset: (toogleTimer)=> dispatch({type: 'attachTimerReset', payload: toogleTimer})
    }
}
  export default connect(null, mapDispatchToProps)(Stopwatch);