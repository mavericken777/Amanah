import React from "react";
import ReactDOM from "react-dom/client";
import { SecondaryPage } from "./components/pages/SecondaryPage";

import "./styles/tokens.css";
import "./styles/motion.css";
import "./styles/glass.css";
import "./styles/foundation.css";
import "./styles/phase4.css";
import "./styles/secondary.css";
import "./styles/flagship.css";
import "./styles/platinum-final.css";
import "./styles/process-3d.css";

ReactDOM.hydrateRoot(document.getElementById("root")!,
  <React.StrictMode><SecondaryPage /></React.StrictMode>,
);
