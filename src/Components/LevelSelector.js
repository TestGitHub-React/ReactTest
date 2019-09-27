import React, { Component } from 'react';
import '../Styles/LevelSelector.css'
import config from '../config';
import {connect} from 'react-redux';

class LevelSelector extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
      }
    state = {
        message: " "
    }
    componentDidMount(){
        console.log(this.props)
        this.inputRef.current.value = config.startLevel
    }
    onChange = (e) => {
        console.log(e.target.value);
        if (e.target.value > config.maxLevel) {
            this.setState({ message: "Level cannot be greater than " +  config.maxLevel + "."})
        }
        else if (e.target.value < config.startLevel) {
            this.setState({ message: "Level cannot be lower than config defined (" + config.startLevel + ")." })
        }
        else {
            this.setState({message:" "})
        }
    }

    btnClick = ()=> {
        this.props.onLevelSelected(this.inputRef.current.value);
        localStorage.setItem('currentLevel', this.inputRef.current.value);
        this.props.history.push("/game");
    }

    render() {
        
 
        return (
            <div className="container_div">
               


                <form action="/game">
                <label>Please select level: </label>
    <input type="number" placeholder="Select level.." onChange={(e) => this.onChange(e)} ref={this.inputRef}></input>
    <p className="errorMessage">
{this.state.message}
</p>
    
    <input type="submit" value="Play!" disabled={!(this.state.message === " ")} onClick={this.btnClick}></input>
        </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLevelSelected: (level)=> dispatch({type: 'onLevelSelected', payload:level})
    }
}

export default connect(null, mapDispatchToProps)(LevelSelector);