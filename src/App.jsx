import React from "react";
import { motion } from "framer-motion";
import "./styles/app.css";
// http://mkweb.bcgsc.ca/colornames/
import Colours from "./assets/colours";
// Components
import RandomButton from "./components/randomButton";
import SideMenu from "./components/sideMenu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColour: {
        hex: "#000000",
        rgb: [0, 0, 0],
        hsl: [0, 0, 0],
      },
      inputColour: "#000000",
      colourHistory: [],
    }
  }

  setColour(hex) {
    let newHistory = this.state.colourHistory;

    if (newHistory.includes(hex)) {
      const index = newHistory.indexOf(hex);
      newHistory.splice(index, 1);
    }
    newHistory.unshift(hex);

    this.setState({
      currentColour: {
        hex: hex,
        rgb: this.hexToRGB(hex),
        hsl: this.hexToHSL(hex)
      },
      colourHistory: newHistory,
    })
  }

  hexToRGB(hex) {
    const hexNum = hex.slice(1);
    const bigint = parseInt(hexNum, 16);

    return [
      (bigint >> 16) & 255, // r
      (bigint >> 8) & 255,  // g
      bigint & 255          // b
    ];
  }

  hexToHSL(hex) {
    let [ r, g, b ] = this.hexToRGB(hex);

    r /= 255;
    g /= 255;
    b /= 255;

    let channelMin = Math.min(r,g,b);
    let channelMax = Math.max(r,g,b);
    let delta = channelMax - channelMin;
    let h = 0;
    let s = 0;
    let l = 0;

    if (delta === 0) {
      h = 0;
    }
    else if (channelMax === r) {
      h = ((g - b) / delta) % 6;
    }
    else if (channelMax === g) {
      h = (b - r) / delta + 2;
    }
    else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (channelMax + channelMin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [ h, s, l ];
  }
  
  getClosestColour(hex) {
    // https://en.wikipedia.org/wiki/Color_difference
    
    this.setState({ inputColour: hex })

    // Gets all stored hex values for colours with names
    const colours = Object.keys(Colours);
    const [ inputR, inputG, inputB ] = this.hexToRGB(hex);
    
    let closestColour = null;
    let shortestVector = 500;

    // Finds colour with the shortest vector  
    colours.forEach((item) => {
      const listHexColour = item.slice(1);
      const [ arrayR, arrayG, arrayB ] = this.hexToRGB(listHexColour);
      
      const vector = Math.sqrt( (inputR - arrayR) ** 2 + (inputB - arrayB) ** 2 + (inputG - arrayG) ** 2);

      if (vector < shortestVector) {
        shortestVector = vector;
        closestColour = item
      }
    });
    
    this.setColour(closestColour);
  }

  getRandomColour() {
    const randomHexColour = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    this.getClosestColour(randomHexColour);
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
      document.body.style.backgroundColor = this.state.currentColour;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="main-body" style={{ backgroundColor: this.state.currentColour.hex }}>
          <motion.div className="title-container" layout="position">
            <motion.div className="colour-name info-border">{Colours[this.state.currentColour.hex]}</motion.div>
            <div className="info-container">
              <div className="hex info-border">{this.state.currentColour.hex.toUpperCase()}</div>
              <div className="rgb info-border">{`RGB (${this.state.currentColour.rgb[0]}, ${this.state.currentColour.rgb[1]}, ${this.state.currentColour.rgb[2]})`}</div>
              <div className="hsl info-border">{`HSL (${this.state.currentColour.hsl[0]}, ${this.state.currentColour.hsl[1]}, ${this.state.currentColour.hsl[2]})`}</div>
            </div>
          </motion.div>

          <SideMenu setColour={(hex) => this.setColour(hex)} colourHistory={this.state.colourHistory}/>
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