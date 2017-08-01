import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./configureStore";
import App from "./containers/App/App";
import globalStyles from "./global.sass";
const store = configureStore();

// Cleaning duty 0.1.0
// Author: Mikolaj Speichert
// Created: 03 July 2017
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
