import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { ThemeProvider, CssBaseline } from "@material-ui/core";

import App from "./App";
import { store } from "./store/store";

import theme from "./theme";
import "./index.css";

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
    </ThemeProvider>,
  document.getElementById('root')
);
