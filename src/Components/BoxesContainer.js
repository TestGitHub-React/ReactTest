import React, { Component } from 'react';
import Box from './Box'
import '../Styles/Table.css'
import { connect } from 'react-redux'

class BoxesContainer extends Component {
    state = {
        boxes: []
    }

    componentDidMount() {
        this.props.onInitLeft2Click(Number(this.props.level) + 1);
    }

    constructor(props) {
        super(props);
        this.gameStatsRef = React.createRef();
        var tmpArr = [];
        var index = 0;
        for (let row = 0; row < 10; row++)
            for (let col = 0; col < 10; col++) {
                tmpArr.push(
                    {
                        index: index++,
                        isSelected: false,
                        row: row,
                        col: col,
                        shouldBeClicked: false,
                        isNext: false,
                        clicked: false
                    }
                );
            }
        this.state = {
            boxes: tmpArr,
            levelCreated: false,
            leftToClick: this.props.level,
            level: this.props.level,
            lives: 0
        }
    }

    getPosibleMoves = (index) => {
        let difs = [];
        let row = index / 10;
        let col = index % 10;
        if (row > 2) difs.push(30);
        if (row < 7) difs.push(-30);
        if (col > 2) difs.push(3);
        if (col < 7) difs.push(-3);
        if (row > 1 && col > 1) difs.push(22);
        if (row > 1 && col < 8) difs.push(18);
        if (row < 8 && col < 8) difs.push(-22);
        if (row < 8 && col > 1) difs.push(-18);
        const posibleIndexes = difs.filter((val) => {
            return (index - val >= 0 && index - val <= 99);
        }).map((val, idx) => {
            return index - val;
        });
        return posibleIndexes;
    }

    getRandomSubArray = (arr, count) => {
        if(arr.length === 0) return [[]];
        let _arr = [...arr];
        return [...Array(count)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]);
    }

    createLevelIndexes = (level, index, foundArr) => {

        
        
        if (level > 0) {
            
            var arrPosibleMoves1 = this.getPosibleMoves(index);
            var arrPosibleMoves = this.getRandomSubArray(arrPosibleMoves1, arrPosibleMoves1.length);
            for (let i = 0; i < arrPosibleMoves.length; i++) {
                let newIndex = arrPosibleMoves[i];
                if (!foundArr.includes(newIndex)) {
                    var res = this.createLevelIndexes(level - 1, newIndex, [...foundArr, index]);
                    if (res.length > 0) {
                        return [...res, newIndex];
                        
                        
                    }

                }
            }
          return  [];
        }

        if(level === 0) return[...foundArr, index];

        return [];
    }


    increaseLevel = () => {
        this.props.onLevelIncrease();
        this.props.onInitLeft2Click(Number(this.props.level) + 2);
    }

    clearTable = () => {

        this.state.boxes.forEach((el) => {
            el.shouldBeClicked = false;
            el.isNext = false;
            el.isSelected = false;
            el.clicked = false;

        })
        this.setState({
            levelCreated: false
        })
    }

    boxClicked = (box_index) => {
        var arrTmp = [...this.state.boxes];

        let randomBoxes = [];
        if (!this.state.levelCreated) {
            arrTmp[box_index].clicked = true;
            this.props.onLeft2ClickDecrease();
            this.props.timerReset();
            this.props.timerToogle();
            randomBoxes = this.createLevelIndexes(Number(this.props.level), box_index, []);
                    
            for (var el of randomBoxes) {
                arrTmp[el].shouldBeClicked = true;
            }

        }
        else {
            if (arrTmp[box_index].shouldBeClicked && arrTmp[box_index].isNext) {
                arrTmp[box_index].clicked = true;
                this.props.onLeft2ClickDecrease();
            }
            else {
                return;
            }
            randomBoxes = arrTmp.filter((box) => {
                return box.clicked === false && box.shouldBeClicked === true;
            });
        }

        if (randomBoxes.length === 0) {
            this.setState(
                {
                    boxes: [...arrTmp],
                    levelCreated: true
                });
            console.log('Finish with success!!!');
            this.props.timerToogle();
            this.increaseLevel();
            this.clearTable();
            this.props.onArangeLives(1);
            return;
        }
        let nextBoxes = this.getPosibleMoves(box_index);

        for (var s of arrTmp) {
            s.isNext = false;
        }
        for (var e of nextBoxes) {
            if (!arrTmp[e].clicked && arrTmp[e].shouldBeClicked)
                arrTmp[e].isNext = true;
        }

        if (arrTmp.filter((el) => { return el.isNext === true }).length === 0) {
            console.log('No more boxes you can click, game over!..');
            this.props.timerToogle();
            this.props.onArangeLives(-arrTmp.filter((el) => { return el.clicked === false && el.shouldBeClicked === true }).length);
            this.clearTable();
            this.props.onInitLeft2Click(Number(this.props.level) + 1);
            return;
        }
        this.setState(
            {
                boxes: [...arrTmp],
                levelCreated: true
            });

    }

    render() {

        var finalArr = [];
        for (let row = 0; row < 10; row++) {
            let subArr = [];
            for (let cell = 0; cell < 10; cell++) {
                subArr.push(this.state.boxes[row * 10 + cell]);
            }
            finalArr.push(subArr);
        }
        const boxes = finalArr.map((subArr, idx) => {
            return (
                <tr key={idx}>
                    {
                        subArr.map(data => {
                            return (<td key={data.index}><Box data={data} arrangeLevel={this.boxClicked}></Box></td>)

                        })
                    }
                </tr>)
        });

        return (

            <div className="table_container">
                <table className="game_table">
                    <tbody>
                        {
                            boxes
                        }
                    </tbody>
                </table>
            </div>



        )
    }
}

const mapStateToProps = state => {
    return {
        level: state.level,
        timerToogle: state.timerToogle,
        timerReset: state.timerReset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLevelIncrease: () => dispatch({ type: 'onLevelIncrease' }),
        onArangeLives: (amount) => dispatch({ type: 'onArangeLives', payload: amount }),
        onLeft2ClickDecrease: () => dispatch({ type: 'onLeft2ClickDecrease' }),
        onInitLeft2Click: (amount) => dispatch({ type: 'onInitLeft2Click', payload: amount })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxesContainer);