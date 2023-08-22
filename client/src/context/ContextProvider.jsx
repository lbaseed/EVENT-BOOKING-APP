import { useReducer } from "react";
import authReducer from "../reducer/auth-reducer";
import Context from "./context";

export const initialState = {
	me: {
		token: null,
		userId: null,
	},
	isLoggedIn: false,
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};

export default ContextProvider;
