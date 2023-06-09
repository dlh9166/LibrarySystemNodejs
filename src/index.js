import React from 'react';
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import './index.css';
import './index.scss';
import App from './App';
// import reportWebVitals from "./reportWebVitals";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
// ReactDOM.render( <App />, document.getElementById('root'))