import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SecondaryPage } from "./components/pages/SecondaryPage";
import "./styles/tokens.css";
import "./styles/motion.css";
import "./styles/glass.css";
import "./styles/foundation.css";
import "./styles/phase4.css";
import "./styles/secondary.css";
import "./styles/flagship.css";

const file = window.location.pathname.split("/").filter(Boolean).pop() ?? "index.html";
const isHome = file === "index.html" || !file.includes(".");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isHome ? <App /> : <SecondaryPage />}
  </React.StrictMode>,
);
