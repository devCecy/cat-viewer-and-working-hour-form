import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

const useTestTemplate = (children: JSX.Element) => {
	const queryClient = new QueryClient();
	return (
		<ThemeProvider theme={theme}>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<Router>{children}</Router>
				</QueryClientProvider>
			</RecoilRoot>
		</ThemeProvider>
	);
};

export default useTestTemplate;
