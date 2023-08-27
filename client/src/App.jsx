import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";
import ContextProvider from "./context/ContextProvider";
import MyRoutes from "./MyRoutes.jsx";

const App = () => {
	return (
		<BrowserRouter>
			<ContextProvider>
				<main className="main-content">
					<MainNavigation />
					<MyRoutes />
				</main>
			</ContextProvider>
		</BrowserRouter>
	);
};

export default App;
