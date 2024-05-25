
import './App.css';
import Board from './components/Board/board'
import AppContext from './contexts/context';
import { useReducer } from 'react';
import { reducer } from './reducer/reducer';
import { initGameState } from './constant';
import Control from './components/Board/Control/Control';
import MovesList from './components/Board/Control/bits/MovesList';
import TakeBack from './components/Board/Control/bits/TakeBack';

function App() {
  
  const [appState, dispatch] = useReducer(reducer,initGameState)

  const providerState = {
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value={providerState}>
    <div className="App">
      <Board/>
      <Control>
        <MovesList />
        <TakeBack/>
      </Control>
    </div>
    </AppContext.Provider>
  );
}

export default App;
