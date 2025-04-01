function GridRow({
  columnIndex,
  size,
  currentPlayer,
  setTurnCount,
  gameGrid,
  setGameGrid,
}) {
  return (
    <div className="grid-row">
      {Array.from({ length: size }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid-cell">
          <button
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
                setTurnCount((prev) => prev + 1);
              }
            }}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default GridRow;
