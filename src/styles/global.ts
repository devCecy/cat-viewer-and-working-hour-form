import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

html,
body {
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
	font-size: 62.5%;
}

  a {
	color: inherit;
	text-decoration: none;
  }

  button {
	border: transparent;
	cursor: pointer;
  background-color: transparent;
  }

	ul,ol,li{
		list-style : none;
	}

	input:focus {
		outline: 1px solid #7551F6;
		border:  1px solid #7551F6;
	}
`;

export default GlobalStyle;
