import React from "react";
import { NavLink } from "react-router-dom";
import "./mainNavigation.css";

const MainNavigation = () => {
	return (
		<header className="main-navigation">
			<div className="main-navigation_logo">
				<h1>EasyEvent</h1>
			</div>
			<div className="main-navigation_items">
				<ul>
					<li>
						<NavLink to="/auth">Login</NavLink>
					</li>
					<li>
						<NavLink to="/events">Events</NavLink>
					</li>
					<li>
						<NavLink to="/bookings">Bookings</NavLink>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default MainNavigation;
