import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import CatViewer from "./pages/CatViewer";
import WorkingHours from "./pages/WorkingHours";

function App() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path="/" element={<CatViewer />} />
				<Route path="/cat-viewer" element={<CatViewer />} />
				<Route path="/working-hour" element={<WorkingHours />} />
			</Routes>
		</Router>
	);
}

export default App;
