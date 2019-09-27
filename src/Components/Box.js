import React, { Component } from 'react';
import '../Styles/Box.css';


class Box extends Component  {

    
   onClickEvent = () => {
        this.props.arrangeLevel(this.props.data.index);
    };
    render(){
        let style = [];
        style.push('Box');
        if(this.props.data.shouldBeClicked) style.push('ShouldBeClicked');
        if(this.props.data.isNext) style.push('Next');
        if(this.props.data.clicked) style.push('Clicked');
    
        return (
            <div className={style.join(' ')} onClick={this.onClickEvent}>
              
            </div>
    );
    }
}

export default Box;