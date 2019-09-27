import React, { Component } from 'react';
import Stopwatch from './Stopwatch';
import '../Styles/GameStats.css'
import {connect} from 'react-redux';

class GameStats extends Component {
    constructor(props) {
        super(props);
        this.timerRef = React.createRef();
    }

    render() {
        return (
            <div className="game_stats_container">
                <table className="game_stats_table">
                    <tbody>
                        <tr>
                            <td className="game_stats_header">Game Stats</td>
                            <td className="timer"><strong>Timer: </strong><Stopwatch></Stopwatch> seconds</td>
                            <td className="left2click"><strong>Left to Click:</strong> {this.props.left2click}</td>
                            <td><strong>Lives: </strong>{this.props.lives}</td>
                            <td><strong>Level:</strong> {this.props.level}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        level: state.level,
        lives: state.lives,
        left2click: state.left2click
    }
}

export default connect(mapStateToProps)(GameStats);