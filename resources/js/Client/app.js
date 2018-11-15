import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Router from "./router";

const theme = {
  mainColor: "#97695C",
  light: "#FBFCFF",
  dark: "#7d7d7d"
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    );
  }
}

export default App;

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
