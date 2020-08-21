import React from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { HuePicker as ColourPick } from "react-color";
import "../styles/searchBar.css";

// class MyColorPicker extends React.Component {
//   render() {
//     return <div>MyColorPicker</div>;
//   }
// }

// function ColourPicker() {
//   return CustomPicker(MyColorPicker);
// }

const searchBarVariants = {
  open: {
    width: "calc(100vw - 40px)",
    borderRadius: "10px",
    boxShadow: "0px 5px 10px 2px rgba(0,0,0,0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  closed: {
    width: "60px",
    borderRadius: "60px",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.3)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const searchBarItemVariants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  closed: {
    opacity: 0,
  },
};

const placeholderText = {
  name: "Colour Name",
  hex: "Hex Value",
  rgb: "RGB Value",
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: "",
      currentSearch: "name",
      colourPicker: "#fff",
    };

    this.searchInput = React.createRef();
  }

  toggleBar() {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        this.searchInput.current.focus();
      }
    });
  }

  extractValue() {
    if (this.state.currentSearch === "rgb") {
      return {
        r: 5,
        g: 5,
        b: 5,
      };
    }

    if (this.state.currentSearch === "hex") {
      // tests if hex value is valid
      if (/^#([0-9A-F]{3}){1,2}$/i.test(this.state.value)) {
        return this.state.value;
      } else {
        return null;
      }
    }

    else if (this.state.currentSearch === "pick") {
      return this.state.colourPicker;
    }

    else {
      return this.state.value;
    }
  }

  handleChangeComplete(data) {
    if (data.hex !== this.state.colourPicker) {
      this.setState({ colourPicker: data.hex });
    }
  }

  handleSubmit(e={preventDefault: ()=>{}}) {
    e.preventDefault();
    
    const value = this.extractValue();
    if (value !== null) {
      const query = {
        type: this.state.currentSearch,
        value: value,
      };
      this.props.searchColours(query);
    }
  }

  handleChange(e) {
    let value = e.target.value;

    if (this.state.currentSearch === "name") {
      if (value.charAt(0) === "#") {
        this.setState({
          value: value,
          currentSearch: "hex",
        });
      } else if (value.substring(0, 3).toLowerCase() === "rgb") {
        value = value.substring(0, 3).toUpperCase() + value.substring(3);
        this.setState({
          value: value,
          currentSearch: "rgb",
        });
      } else {
        this.setState({
          value: value,
        });
      }
    } else if (this.state.currentSearch === "hex") {
      if (value.charAt(0) !== "#") {
        this.setState({
          value: "#" + value,
        });
      } else {
        this.setState({ value: value });
      }
    } else if (this.state.currentSearch === "rgb") {
      this.setState({ value: value });
    }
  }

  changeSearch(type) {
    const value = type === "hex" ? "#" : "";

    if (type !== this.state.currentSearch) {
      this.setState({
        currentSearch: type,
        value: value,
      });
    }
  }

  render() {
    return (
      <motion.div
        className="search-bar-container"
        initial="closed"
        animate={this.state.isOpen ? "open" : "closed"}
        variants={searchBarVariants}
      >
        <motion.div
          className="search-bar-items-container"
          variants={searchBarItemVariants}
          style={
            this.state.isOpen
              ? { pointerEvents: "all" }
              : { pointerEvents: "none" }
          }
        >
          {this.state.currentSearch === "pick" ? (
            <>
              <ColourPick
                className="colour-picker"
                color={this.state.colourPicker}
                onChange={(data) => this.handleChangeComplete(data)}
              />
              <div
                className="picker-submit-button search-icons"
                style={{ backgroundColor: this.state.colourPicker }}
                onClick={() => this.handleSubmit()}
              >
                Submit
              </div>
            </>
          ) : (
            <form
              className="search-form"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <input
                type="text"
                className="search-input"
                ref={this.searchInput}
                placeholder={placeholderText[this.state.currentSearch]}
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </form>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="30"
            viewBox="0 0 24 24"
            width="30"
            className="search-icons"
            fill="currentColor"
            data-toggle="tooltip"
            data-placement="top"
            data-tip="Colour Name"
            style={
              this.state.currentSearch === "name"
                ? { backgroundColor: "rgba(212, 212, 212, 0.527)" }
                : { backgroundColor: "rgba(255, 255, 255, 1)" }
            }
            onClick={() => this.changeSearch("name")}
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <g>
                <g>
                  <path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
                </g>
              </g>
            </g>
          </svg>

          <svg
            width="30px"
            height="30px"
            viewBox="0 0 16 16"
            className="bi bi-hash search-icons"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            data-tip="Hex Value"
            style={
              this.state.currentSearch === "hex"
                ? { backgroundColor: "rgba(212, 212, 212, 0.527)" }
                : { backgroundColor: "rgba(255, 255, 255, 1)" }
            }
            onClick={() => this.changeSearch("hex")}
          >
            <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 0 24 24"
            width="30px"
            className="search-icons"
            fill="currentColor"
            data-tip="RGB Value"
            style={
              this.state.currentSearch === "rgb"
                ? { backgroundColor: "rgba(212, 212, 212, 0.527)" }
                : { backgroundColor: "rgba(255, 255, 255, 1)" }
            }
            onClick={() => this.changeSearch("rgb")}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 0 24 24"
            width="30px"
            className="search-icons"
            fill="currentColor"
            data-tip="Colour Picker"
            onClick={() => this.changeSearch("pick")}
            style={
              this.state.currentSearch === "pick"
                ? { backgroundColor: "rgba(212, 212, 212, 0.527)" }
                : { backgroundColor: "rgba(255, 255, 255, 1)" }
            }
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 0 24 24"
            width="30px"
            className="search-icons"
            fill="currentColor"
            data-tip="Random Colour!"
            onClick={() => this.props.randomColour()}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
          </svg>
        </motion.div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          className="search-icon"
          fill="currentColor"
          onClick={() => this.toggleBar()}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <ReactTooltip effect="solid" />
      </motion.div>
    );
  }
}

export default SearchBar;
