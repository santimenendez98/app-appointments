import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Components/Routes/index.js";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { BrowserRouter } from "react-router-dom";
import styles from "./input.css";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes className={styles} />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
