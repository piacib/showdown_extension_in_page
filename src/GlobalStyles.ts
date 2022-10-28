import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

html {
  font-size: 20px;
}
body {
  margin: 0;
  width: 650px;

}
button {
  font-family: inherit;
}
#react-root {
  font-family: inherit;

  font-size: 1rem;
  }
#react {
   display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - calc(2 * ${(props) => props.theme.outerBorderWidth}));
  height: 100%;
  border: ${(props) => `${props.theme.outerBorderWidth}
   ${props.theme.outerBorderColor}
   ${props.theme.outerBorderStyle}`};
  background-color: ${(props) => props.theme.backgroundColor};

}
h1 {
  font-size:2.7rem;
}
`;
