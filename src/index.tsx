import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const body = document.getElementsByClassName("battle-log");

const app = document.createElement("div");

app.id = "react-root";

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (body && body[0]) {
  body[0].prepend(app);
}

const container = document.getElementById("react-root");
const root = createRoot(container!);

root.render(<App />);
