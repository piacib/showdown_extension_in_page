import { createGlobalStyle } from "styled-components";
import VT323Regular from "./fonts/VT323-Regular.woff";
import VT323Regular2 from "./fonts/VT323-Regular.woff2";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'VT323';
  src: url(${VT323Regular2}) format('woff2'),
       url(${VT323Regular}) format('woff');
}
`;

export default FontStyles;
