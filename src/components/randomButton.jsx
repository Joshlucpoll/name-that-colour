import React from "react";
import RandomIcon from "../assets/random.svg";
import "../styles/randomButton.css";


function RandomButton(props) {
  return (
    <div className="random-button-container" onClick={props.onClick} title="Press 'r'">
      <img className="random-icon" alt="Random Colour Button" src={RandomIcon}></img>
      <div className="random-text">Random Colour!</div>
    </div>
  );
}

export default RandomButton;