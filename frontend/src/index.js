import React from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import Game from "./Game";
function App() {
  return (
    <div>
      <Game />
    </div>
  );
}

render(<App />, document.getElementById("root"));
