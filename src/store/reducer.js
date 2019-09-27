const initialState = {
 level: (localStorage.getItem('currentLevel') === null)? 0: localStorage.getItem('currentLevel'),
 lives: (localStorage.getItem('currentLives') === null)? 0: localStorage.getItem('currentLives')
}

const reducer = (state = initialState, action) => {
    if(localStorage.getItem('currentLives') === null) localStorage.setItem('currentLives', 0);
    if(action.type === 'onLevelSelected'){
        return {
            ...state,
            level: action.payload,
            left2click: Number(action.payload) + 1
        }
    }
    if(action.type === 'onLevelIncrease'){
        localStorage.setItem('currentLevel', Number(state.level) + 1)
        return {
            ...state,
            level: Number(state.level) + 1
        }
    }
    if(action.type === 'onArangeLives'){
        localStorage.setItem('currentLives', Number(state.lives) + action.payload)
        return {
            ...state,
            lives: Number(state.lives) + action.payload
        }
    }
    if(action.type === 'onLeft2ClickDecrease'){
        return {
            ...state,
            left2click: state.left2click - 1
        }
    }
    if(action.type === 'onInitLeft2Click'){
        return {
            ...state,
            left2click: Number(action.payload)
        }
    }
    if(action.type === 'attachTimerToogle'){
        return {
            ...state,
            timerToogle: action.payload
        }
    }
    if(action.type === 'attachTimerReset'){
        return {
            ...state,
            timerReset: action.payload
        }
    }
    
    return state;
}

export default reducer;