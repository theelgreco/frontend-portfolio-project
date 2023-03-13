import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Reviews from "./Components/Reviews";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Reviews />
  </React.StrictMode>
);
