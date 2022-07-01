import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/App";
import createStore from "./app/store/createStore";
import history from "./app/utils/history";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
