import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

// styles
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

// redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const persistor = persistStore(store);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<PersistGate loading={null} persistor={persistor}>
				<Provider store={store}>
					<RecoilRoot>
						<QueryClientProvider client={queryClient}>
							<App />
						</QueryClientProvider>
					</RecoilRoot>
				</Provider>
			</PersistGate>
		</ThemeProvider>
		<GlobalStyle />
	</React.StrictMode>
);
