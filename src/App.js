import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const gridSize = 4;
const clickSymbol = "O";
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

function GridRow({ size, currentPlayer, setTurnCount }) {
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
      {Array.from({ length: size }).map((_, index) => (
        <div key={index} className="grid-cell">
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
              event.target.innerText = currentPlayer.symbol;
              setTurnCount((prev) => prev + 1);
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

  useEffect(() => {
    setCurrentPlayer(playerConfig[turnCount % playerConfig.length]);
  }, [turnCount]);

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
              <GridRow key={index} size={gridSize} currentPlayer={currentPlayer} setTurnCount={setTurnCount} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
