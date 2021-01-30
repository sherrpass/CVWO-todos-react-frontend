import "react-app-polyfill/ie11";
import "core-js/features/array/find";
import "core-js/features/array/includes";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.scss";

ReactDOM.render(<App />, document.getElementById("root"));
