import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import ResultAlert from './ResultAlert';
import GameBoard from './GameBoard';
import Banner from './Banner';
import getGame from '../helpers/gameEngine';
import getModifiedPlayers from '../helpers/gameService';
import GameContext from '../helpers/gameContext';
import Loader from 'react-loader-spinner';

function App() {

  const MAX_WIN_COUNT = 10;
  // for getting all the players
  const [allPlayers, setAllPlayers] = useState([]);
  // for getting the game set of player cards
  const [playerCards, setPlayerCards] = useState([]);
  // counting number of wins
  const [winCount, setWincount] = useState(0);
  // to show score after showing result
  const [showScore, setShowScore] = useState(false);
  // to allow game play (and not allow when the result alert has been shown)
  const [activateGame, setActivateGame] = useState(true);
  // to manage once the winCount reaches its limit
  const [showBanner, setShowBanner] = useState(false);
  // error handing component
  const [showError, setShowError] = useState(false);
  // loading spinner
  const [showLoading, setShowLoading] = useState(true);
  // result alert props
  const [alertProps, setAlertProps] = useState({ showAlert: false, contentMessage: '', confimButtonText: '' });

  const loadingSpinnerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  async function getPlayers() {
    let players;
    if (allPlayers.length === 0) {
      console.log('no players. calling api to get players');
      try {
        let apiResult = await getModifiedPlayers();
        setAllPlayers(apiResult);
        players = getGame(2, apiResult);
        setPlayerCards(players);
        setShowLoading(false);
      } catch (error) {
        console.error('error from game engine ' + error);
        setShowError(true);
        setShowLoading(false);
      }
    } else {
      console.log('cached players');
      players = getGame(2, allPlayers);
      setPlayerCards(players);
    }
  }

  // get game set for GameBoard
  useEffect(() => {
    getPlayers();
  }, []);

  // Increment wincount and handling its side effects
  const incrementWinCount = () => {
    let OkButtonText = 'Play again';
    let result = winCount + 1;
    setWincount(result);
    if (result >= MAX_WIN_COUNT) {
      OkButtonText = 'Play something else';
    }
    setAlertProps({
      ...alertProps,
      showAlert: true,
      contentMessage: 'You won.',
      confirmButtonText: OkButtonText
    });
  }

  // Process result (increment winCount or show Lost alert)
  const processResult = (param) => {
    setActivateGame(false);
    setShowScore(true);
    if (param) {
      incrementWinCount();
    } else {
      setAlertProps({
        ...alertProps,
        showAlert: true,
        contentMessage: 'You lost',
        confirmButtonText: 'Play again'
      });
    }
  }

  // to restart the game for another attempt
  const restartGame = () => {
    setActivateGame(true);
    setShowScore(false);
    setAlertProps({ ...alertProps, showAlert: false });
    getPlayers();
  }

  // to manage gameplay after reaching max win count
  const showMeMore = () => {
    setShowBanner(true);
  }

  // render the App.
  if (showBanner) {
    return <Banner />
  }

  if (showLoading) {
    return <div>
      <h1>loading...</h1>
      <Loader type="BallTriangle" color="#2BAD60" style={loadingSpinnerStyle} />
    </div>;
  }

  if (showError) {
    return <h1>Something went wrong. see logs for details.</h1>;
  } else {
    return (<div className="App">
      <header className="App-header">
        Guess the winner
        </header>
      <div>
        <h2>Win Count: {winCount}</h2>
        <GameContext.Provider value={{ processResult, showScore, activateGame }} >
          <GameBoard playerCards={playerCards} resetBoard={activateGame} />
        </GameContext.Provider>
        <ResultAlert alertProps={alertProps} restartGame={restartGame} showMeMore={showMeMore} />
      </div>
    </div>)
  }
}

export default App;
