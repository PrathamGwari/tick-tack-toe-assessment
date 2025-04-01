import logo from "./logo.svg";
import "./App.css";

const gridSize = 4;
const clickSymbol = "O";

function GridRow({ size }) {
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
              backgroundColor: "#f0f0f0",
              border: "1px solid black",
              fontSize: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="grid-cell-button"
            onClick={(event) => {
              event.target.innerText = clickSymbol;
            }}
          >
          </button>
        </div>
      ))}
    </div>
  );
}
function App() {
  return (
    <div
      style={{
        height: "100vh",
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
          <GridRow key={index} size={gridSize} />
        ))}
      </div>
    </div>
  );
}

export default App;
