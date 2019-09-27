import React from 'react';
import BoxesContainer from './Components/BoxesContainer';
import GameStats from './Components/GameStats';
import LevelSelector from './Components/LevelSelector';
import  './Styles/Main.css';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom';


function App() {
  return (
    
    <BrowserRouter>

    
    <Route path="/game" exact render={()=>
    <div className="main_container">
     <BoxesContainer/>
      <GameStats/>
      </div>}/>
    {//  <BoxesContainer/>
      //<GameStats></GameStats>
    }
    <Route path="/" exact component={LevelSelector}/>
    
    </BrowserRouter>
  );
}

export default App;
