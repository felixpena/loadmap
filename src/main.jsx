import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LandingPage from "./LandingPage";
import TerminosServicio from "./TerminosServicio";

function App() {
  const path = window.location.pathname;
  if (path === "/terminos") return <TerminosServicio />;
  return <LandingPage />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
