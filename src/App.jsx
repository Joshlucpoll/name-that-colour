import React from "react";
import { motion } from "framer-motion";
import "./styles/app.css";
import Colours from "./assets/colours";
// Components
import RandomButton from "./components/randomButton";
import SideMenu from "./components/sideMenu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColour: Colours[1],
      colourHistory: [],
    }
  }

  setColour(colourNum) {
    let newHistory = this.state.colourHistory;
    newHistory.unshift(Colours[colourNum]);

    this.setState({
      currentColour: Colours[colourNum],
      colourHistory: newHistory,
    })
  }
  
  getRandomColour() {
    const length = Colours.length;
    const randomNumber = Math.floor(Math.random() * length);
    
    this.setColour(randomNumber);
  }

  getRGB() {
    const r = Math.round(parseInt(this.state.currentColour.red.slice(0, -1)) * 2.56);
    const g = Math.round(parseInt(this.state.currentColour.green.slice(0, -1)) * 2.56);
    const b = Math.round(parseInt(this.state.currentColour.blue.slice(0, -1)) * 2.56);
    
    return `(${r}, ${g}, ${b})`;
  }

  handleKeypress(e) {
    if (e.key === "r") {
      this.getRandomColour();
    }
  }

  componentDidMount() {
    this.getRandomColour();
    window.addEventListener("keypress", (e) => this.handleKeypress(e));
  }
  
  componentWillUnmount() {
    window.removeEventListener("keypress", (e) => this.handleKeypress(e));
  }
  
  componentDidUpdate(prevState) {
    if (this.state.currentColour !== prevState.currentColour) {
      document.body.style.backgroundColor = this.state.currentColour.hex;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="main-body" style={{ backgroundColor: this.state.currentColour.hex }}>
          <motion.div className="title-container" layout="position">
            <motion.div className="colour-name info-border">{this.state.currentColour.name}</motion.div>
            <div className="info-container">
              <div className="hex info-border">{this.state.currentColour.hex}</div>
              <div className="rgb info-border">{this.getRGB()}</div>
              <div className="hsv info-border">H: {this.state.currentColour.hue} S: {this.state.currentColour.satHSL} V: {this.state.currentColour.valueHSV}</div>
              <div className="hsl info-border">H: {this.state.currentColour.hue} S: {this.state.currentColour.satHSL} L: {this.state.currentColour.lightHSL}</div>
            </div>
          </motion.div>

          <SideMenu colourHistory={this.state.colourHistory}/>
          <RandomButton onClick={() => this.getRandomColour()}/>
        </div>

          <div className="overlay-container">
            <motion.div className="overlay"
              initial={{
                background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, #313D53 0%, #313D53 100%)"
              }}
              animate={{
                background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, #313D53 100%, #313D53 100%)"
              }}
              transition={{ duration: 1, delay: 1, ease: [.82, .45, .32, .84] }}
            >
            </motion.div>
            <div className="credit">Made by <a href="https://joshlucpoll.com" target="_blank" rel="noopener noreferrer">Joshlucpoll</a></div>
          </div>
      </div>
    );
  }
}

export default App;