import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/navigation/MainNavigation";

const App = () => {
	return (
		<BrowserRouter>
			<main className="main-content">
				<MainNavigation />
				<Routes>
					<Route path="/" element={<Navigate to="/auth" />} />
					<Route path="/auth" Component={AuthPage} />
					<Route path="/events" Component={EventsPage} />
					<Route path="/bookings" Component={BookingsPage} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
