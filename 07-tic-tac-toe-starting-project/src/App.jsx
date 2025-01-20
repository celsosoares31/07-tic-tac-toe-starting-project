import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const getCurrentPlayer = (arr) => {
  let currentPlayer = 'X';
  if (arr.length > 0 && arr[0].turnPlayer === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getCurrentPlayer(gameTurns);
  const [players, setPLayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  let gameBoard = [...initialBoard.map((arr) => [...arr])];
  let winner;

  for (const turn of gameTurns) {
    const { square, turnPlayer } = turn;
    const { rowIndex, colIndex } = square;

    gameBoard[rowIndex][colIndex] = turnPlayer;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = !winner && gameTurns.length === 9;

  function handleGameRematch() {
    setGameTurns([]);
  }

  function handleGamePlay(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getCurrentPlayer(prevTurns);
      const updatedTurns = [
        {
          square: {
            rowIndex,
            colIndex,
          },
          turnPlayer: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handlePlayerUpdate(symbol, newName) {
    setPLayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  }
  return (
    <main>
      <div id='game-container'>
        <ol
          id='players'
          className='highlight-player'>
          <Player
            name='Celso'
            symbol='X'
            isActive={activePlayer === 'X'}
            onPlayerNameUpdate={handlePlayerUpdate}
          />
          <Player
            name='Celso 5'
            symbol='O'
            isActive={activePlayer === 'O'}
            onPlayerNameUpdate={handlePlayerUpdate}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onRematch={handleGameRematch}
          />
        )}
        <GameBoard
          onGamePlay={handleGamePlay}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
