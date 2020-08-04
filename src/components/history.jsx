import React from "react";
import "../styles/history.css";
import HistoryIcon from "../assets/history.svg";

class History extends React.Component {
  render() {
    return (
      <div className="history-container">
        <div className="history-button-container">
          <img className="history-icon" src={HistoryIcon} alt="History Icon"/>
        </div>
        <div className="history-pane-container">
          <ul className="history-pane">
            {this.props.colourHistory.map((colour) => 
              <li 
                className="colour-history-item" 
                id={colour.id}
                key={colour.id}
                style={{ colour: colour.hex }}
              >{colour.name}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default History;