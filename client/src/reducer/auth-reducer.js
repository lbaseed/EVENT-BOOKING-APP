import { LOGIN_USER, LOGOUT_USER } from "./auth-types";

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_USER:
			// add token to browser cookies

			return {
				...state,
				me: {
					...state.me,
					token: action.payload.token,
					userId: action.payload.userId,
				},
				isLoggedIn: true,
			};
		case LOGOUT_USER:
			return {
				...state,
				me: {
					...state.me,
					token: null,
					userId: null,
				},
				isLoggedIn: false,
			};
		default:
			throw new Error("No case found");
	}
};

export default authReducer;
