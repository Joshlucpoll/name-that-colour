import React from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import Colours from "../assets/colours.json";
import "../styles/sideMenu.css";


// Variants
const sidebarVariants = {
  open: {
    clipPath: `circle(${window.innerHeight * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: i => ({
    transition: {staggerChildren: 0.5/i, staggerDirection: -1 }
  })
};


const topbarItemVariants = {
  open: {
    rotate: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    rotate: 180,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  },
};


// Icons
const HistoryIcon = () => (
  <svg fill="hsl(0, 0%, 18%)" width="24px" height="24px" viewBox="0 0 510 510">
    <g>
      <g id="history">
        <path d="M267.75,12.75c-89.25,0-168.3,48.45-209.1,122.4L0,76.5v165.75h165.75
        l-71.4-71.4c33.15-63.75,96.9-107.1,173.4-107.1C372.3,63.75,459,150.45,459,255s-86.7,191.25-191.25,191.25
        c-84.15,0-153-53.55-181.05-127.5H33.15c28.05,102,122.4,178.5,234.6,178.5C402.9,497.25,510,387.6,510,255
        C510,122.4,400.35,12.75,267.75,12.75z M229.5,140.25V270.3l119.85,71.4l20.4-33.15l-102-61.2v-107.1H229.5z" />
      </g>
    </g>
  </svg>
);

const SettingsIcon = () => (
  <svg fill="hsl(0, 0%, 18%)" viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M 10.490234 2 C 10.011234 2 9.6017656 2.3385938 9.5097656 2.8085938 L 9.1757812 4.5234375 C 8.3550224 4.8338012 7.5961042 5.2674041 6.9296875 5.8144531 L 5.2851562 5.2480469 C 4.8321563 5.0920469 4.33375 5.2793594 4.09375 5.6933594 L 2.5859375 8.3066406 C 2.3469375 8.7216406 2.4339219 9.2485 2.7949219 9.5625 L 4.1132812 10.708984 C 4.0447181 11.130337 4 11.559284 4 12 C 4 12.440716 4.0447181 12.869663 4.1132812 13.291016 L 2.7949219 14.4375 C 2.4339219 14.7515 2.3469375 15.278359 2.5859375 15.693359 L 4.09375 18.306641 C 4.33275 18.721641 4.8321562 18.908906 5.2851562 18.753906 L 6.9296875 18.1875 C 7.5958842 18.734206 8.3553934 19.166339 9.1757812 19.476562 L 9.5097656 21.191406 C 9.6017656 21.661406 10.011234 22 10.490234 22 L 13.509766 22 C 13.988766 22 14.398234 21.661406 14.490234 21.191406 L 14.824219 19.476562 C 15.644978 19.166199 16.403896 18.732596 17.070312 18.185547 L 18.714844 18.751953 C 19.167844 18.907953 19.66625 18.721641 19.90625 18.306641 L 21.414062 15.691406 C 21.653063 15.276406 21.566078 14.7515 21.205078 14.4375 L 19.886719 13.291016 C 19.955282 12.869663 20 12.440716 20 12 C 20 11.559284 19.955282 11.130337 19.886719 10.708984 L 21.205078 9.5625 C 21.566078 9.2485 21.653063 8.7216406 21.414062 8.3066406 L 19.90625 5.6933594 C 19.66725 5.2783594 19.167844 5.0910937 18.714844 5.2460938 L 17.070312 5.8125 C 16.404116 5.2657937 15.644607 4.8336609 14.824219 4.5234375 L 14.490234 2.8085938 C 14.398234 2.3385937 13.988766 2 13.509766 2 L 10.490234 2 z M 12 8 C 14.209 8 16 9.791 16 12 C 16 14.209 14.209 16 12 16 C 9.791 16 8 14.209 8 12 C 8 9.791 9.791 8 12 8 z" />
  </svg>
);

const CodeIcon = () => (
  <svg fill="hsl(0, 0%, 18%)" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);


// Components
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuButton = (props) => (
  <button onClick={props.toggleOpen} style={{pointerEvents: "all"}}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);

const TopBar = (props) => (
  <motion.ul 
    className="sidebar-top-container"
    variants={listVariants}
    custom={3}
  >
    <motion.li
      className="button-container"
      variants={topbarItemVariants}
      onClick={() => props.changeTab("history")}
    >
      <HistoryIcon/>
    </motion.li>
    <motion.li
      className="button-container"
      variants={topbarItemVariants}
      onClick={() => props.changeTab("settings")}
    >
      <SettingsIcon/>
    </motion.li>
    <motion.li
      className="button-container"
      variants={topbarItemVariants}
      onClick={() => props.changeTab("acknowledgements")}
    >
      <CodeIcon/>
    </motion.li>
  </motion.ul>
);

const History = (props) => (
  <motion.div 
    className="history-container"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1, transition: { delay: 0.3} }}
    exit={{ y: 50, opacity: 0 }}
  >
    <motion.div 
      className="history-title"
      variants={{ open: {opacity: 1}, closed: {opacity: 0, transition: {delay: 0.4}} }}
    >History
    </motion.div>
    <motion.div 
      className="clear-button"
      variants={{ open: {opacity: 1}, closed: {opacity: 0, transition: {delay: 0.2}} }}
      onClick={props.clearHistory}
    >Clear
    </motion.div>
    <motion.ul
      className="history-list"
      variants={listVariants}
      custom={props.colourHistory.length}
    >
      <AnimatePresence exitBeforeEnter>
        {props.colourHistory.map(colour => 
          <motion.li
            key={colour}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => props.setColour(colour)}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            layout
            >
            <motion.div
              className="history-item"
              variants={itemVariants}
              style={{ backgroundColor: colour }}
              key={colour + "-content"}
            >
              {Colours[colour]}
            </motion.div>
          </motion.li>
        )}
      </AnimatePresence>
    </motion.ul>
  </motion.div>
);

const Settings = (props) => (
  <motion.div
    className="settings-container"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1, transition: { delay: 0.3} }}
    exit={{ y: 50, opacity: 0 }}
  >
    <motion.div 
      className="settings-title"
      variants={{ open: {opacity: 1}, closed: {opacity: 0, transition: {delay: 0.4}} }}
    >Settings
    </motion.div>
  </motion.div>
);

const Acknowledgements = (props) => (
  <motion.div
    className="acknowledgements-container"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1, transition: { delay: 0.3} }}
    exit={{ y: 50, opacity: 0 }}
  >
    <motion.div 
      className="acknowledgements-title"
      variants={{ open: {opacity: 1}, closed: {opacity: 0, transition: {delay: 0.4}} }}
    >Acknowledgements
    </motion.div>
  </motion.div>
);



class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentTab: "history",
    };
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  toggleOpen() {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen,
      }
    })
  }

  render() {
    return (
      <motion.nav 
        initial={false}
        animate={this.state.isOpen ? "open" : "closed"}
        style={this.state.isOpen ? {pointerEvents: "all"} : {pointerEvents: "none"}}
      >
        <motion.div className="sidebar-background" variants={sidebarVariants}/>
        <MenuButton toggleOpen={() => this.toggleOpen()}/>
        <TopBar changeTab={(tab) => this.changeTab(tab)}/>

        <AnimatePresence>
          {this.state.currentTab === "history" &&
            <History 
              setColour={(hex) => this.props.setColour(hex)} 
              colourHistory={this.props.colourHistory} 
              clearHistory={this.props.clearHistory}
            />
          }
        </AnimatePresence>
        <AnimatePresence>
          {this.state.currentTab === "settings" &&
            <Settings/>
          }
        </AnimatePresence>
        <AnimatePresence>
          {this.state.currentTab === "acknowledgements" &&
            <Acknowledgements/>
          }
        </AnimatePresence>
      </motion.nav>
    );
  }
}

export default SideMenu;