import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import { isDevelopmentMode } from "./functions";

// if (isDevelopmentMode) {
//   const battle = document.createElement("div");
//   battle.className = "battle-log";
//   document.body.appendChild(battle);
// }
const addDisplay = () => {
  const app = document.createElement("div");
  app.id = "react-root";
  const battleLog = document.getElementsByClassName("battle-log");

  // Make sure the element that you want to mount the app to has loaded. You can
  // also use `append` or insert the app using another method:
  // https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
  //
  // Also control when the content script is injected from the manifest.json:
  // https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(app);
  }

  console.log(window.location.pathname);

  const container = document.getElementById("react-root");
  const root = createRoot(container!);

  root.render(
    <>
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </>
  );
};
if (window.location.pathname === "/" && !isDevelopmentMode) {
  let timer = setInterval(() => {
    console.log("checking pathname");
    if (
      window.location.pathname !== "/" &&
      window.location.host === "play.pokemonshowdown.com"
    ) {
      console.log(window.location.pathname);
      clearInterval(timer);
      addDisplay();
    }
  }, 5000);
} else {
  console.log("mounting extension");
  addDisplay();
}
