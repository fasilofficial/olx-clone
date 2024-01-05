import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { firebaseContext } from "./store/Context.jsx";

import firebase from "./firebase/config.js";
import Context from "./store/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ firebase }}>
      <Context>
        <App />
      </Context>
    </firebaseContext.Provider>
  </React.StrictMode>
);
