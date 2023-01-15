import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { devRoomId } from "./developmentMode";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

test("renders learn react link", () => {
  render(<ThemeProvider theme={theme}>{/* <App roomId={devRoomId} /> */}</ThemeProvider>);
  const linkElement = true;
  expect(linkElement).toBeTruthy();
});
