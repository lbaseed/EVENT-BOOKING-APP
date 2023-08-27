import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./mainNavigation.css";
import context from "../../context/context";
import { LOGOUT_USER } from "../../reducer/auth-types";

const MainNavigation = () => {
	const { state, dispatch } = useContext(context);

	const handleLogout = () => {
		dispatch({ type: LOGOUT_USER });
	};
	return (
		<header className="main-navigation">
			<div className="main-navigation_logo">
				<h1>Easy-Event</h1>
			</div>
			<div className="main-navigation_items">
				<ul>
					{!state.isLoggedIn && (
						<li>
							<NavLink to="/auth">Login</NavLink>
						</li>
					)}

					<li>
						<NavLink to="/events">Events</NavLink>
					</li>
					{state.isLoggedIn && (
					<>
						<li>
							<NavLink to="/bookings">Bookings</NavLink>
						</li>
						<li>
							<NavLink to="/auth" onClick={handleLogout}>
								Logout
							</NavLink>
						</li>
					</>
					)}
				</ul>
			</div>
		</header>
	);
};

export default MainNavigation;
