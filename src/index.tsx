import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

// styles
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</RecoilRoot>
		</ThemeProvider>
		<GlobalStyle />
	</React.StrictMode>
);
