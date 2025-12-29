import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Suppress YouTube IFrame API telemetry errors
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("youtubei/v1/log_event") &&
    args[0].includes("ERR_BLOCKED_BY_CLIENT")
  ) {
    return;
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
