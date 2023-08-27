import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import { useContext } from "react";
import context from "./context/context";

const MyRoutes = () => {
	const { state, dispatch } = useContext(context);
	return (
		<Routes>
			{!state.isLoggedIn && (
				<Route element={<Navigate to="/auth" />} />
			)}
			{state.isLoggedIn && (
				<Route path="/" element={<Navigate to="/events" />} />
			)}
			{state.isLoggedIn && (
				<Route path="/auth" element={<Navigate to="/events" />} />
			)}
			{!state.isLoggedIn && <Route path="/auth" Component={AuthPage} />}
			<Route path="/events" Component={EventsPage} />
			{!state.isLoggedIn && <Route path="/bookings" Component={BookingsPage} />}
			)
		</Routes>
	);
};

export default MyRoutes;
