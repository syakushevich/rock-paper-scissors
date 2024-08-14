import React from "react";
import ReactDOM from "react-dom";
import GameComponent from "./components/GameComponent";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("game-root");
  if (container) {
    ReactDOM.render(<GameComponent playUrl={container.dataset.playUrl}/>, container);
  }
});
