import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Components/Layout/Layout.js";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { BrowserRouter, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Route path="/">
          <Layout />
        </Route>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
