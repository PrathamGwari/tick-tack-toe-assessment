import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const gridSize = 5;
const playerConfig = [
  {
    id: 1,
    symbol: "X",
    name: "Player 1",
    color: "red",
  },
  {
    id: 2,
    symbol: "O",
    name: "Player 2",
    color: "blue",
  },
  {
    id: 3,
    symbol: "@",
    name: "Player 3",
    color: "green",
  },
];
const winningCriteria = 3;

function GridRow({
  columnIndex,
  size,
  currentPlayer,
  setTurnCount,
  gameGrid,
  setGameGrid,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: "10px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
      className="grid-row"
    >
      {Array.from({ length: size }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid-cell">
          <button
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#ffffff",
              border: "2px solid #ccc",
              borderRadius: "8px",
              fontSize: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            className="grid-cell-button"
            onClick={(event) => {
              if (event.target.innerHTML === "") {
                event.target.innerHTML = `<div style="
                background-color: ${currentPlayer.color};
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: bold;
              ">${currentPlayer.symbol}</div>`;
                setGameGrid((prev) => {
                  const newGrid = [...prev];
                  newGrid[columnIndex][rowIndex] = currentPlayer.symbol
                    .toString()
                    .toLowerCase();
                  return newGrid;
                });
              }
            }}
          ></button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [turnCount, setTurnCount] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(
    playerConfig[turnCount % playerConfig.length]
  );
  const [gameGrid, setGameGrid] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(""))
  );

  useEffect(() => {
    setCurrentPlayer(playerConfig[turnCount % playerConfig.length]);
  }, [turnCount]);

  useEffect(() => {
    const winResults = checkWin(gameGrid, currentPlayer, winningCriteria);
    console.log("check win results", winResults);
    if (winResults) {
      alert(`${currentPlayer.name} wins!`);
    }
    setTurnCount((prev) => prev + 1);
  }, [gameGrid]);
  return (
    <>
      <div
        className="header"
        style={{
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderBottom: "2px solid #e9ecef",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <div
          className="player-info"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            className="player-symbol"
            style={{
              backgroundColor: currentPlayer.color,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {currentPlayer.symbol}
          </div>
          <div className="player-name">{currentPlayer.name}'s Turn</div>
        </div>
      </div>
      <div className="game-grid-container">
        <div
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="App"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="App"
          >
            {Array.from({ length: gridSize }).map((_, index) => (
              <GridRow
                key={index}
                columnIndex={index}
                size={gridSize}
                currentPlayer={currentPlayer}
                setTurnCount={setTurnCount}
                gameGrid={gameGrid}
                setGameGrid={setGameGrid}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function checkWin(gameGrid, currentPlayer, winningCriteria) {
  const symbol = currentPlayer.symbol.toLowerCase();
  const checkConsecutive = (arr) =>
    arr
      .join("")
      .match(new RegExp(`(${symbol})\\1{${winningCriteria - 1}}`, "g"));

  console.log("gameGrid", gameGrid);
  console.log("checking win for player", currentPlayer);
  // Check rows
  for (let row = 0; row < gridSize; row++) {
    if (checkConsecutive(gameGrid[row])) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < gridSize; col++) {
    const column = gameGrid.map((row) => row[col]);
    if (checkConsecutive(column)) {
      return true;
    }
  }

  // Check diagonals
  let diagonal1 = [];
  let diagonal2 = [];
  for (let i = 0; i < gridSize; i++) {
    diagonal1.push(gameGrid[i][i]);
    diagonal2.push(gameGrid[i][gridSize - 1 - i]);
  }
  if (checkConsecutive(diagonal1) || checkConsecutive(diagonal2)) {
    return true;
  }

  return false;
}

export default App;
