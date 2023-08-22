import { useState, useContext, useEffect } from "react";
import "./Auth.css";
import { LOGIN_USER } from "../reducer/auth-types";
import Context from "../context/context";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
	const { state, dispatch } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const switchModeHandler = () => {
		return setIsLoggedIn(!isLoggedIn);
	};
	
	const submitHandler = (e) => {
		e.preventDefault();
		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		const registerBody = {
			query: `
      mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}) {
          _id
          email
        }
      }
      `,
		};

		const loginBody = {
			query: `
      query {
        login(email: "${email}", password: "${password}") {
          token
          tokenExp
          userId
        }
      }
      `,
		};

		try {
			fetch("http://127.0.0.1:3000/graphql", {
				method: "post",
				body: isLoggedIn
					? JSON.stringify(loginBody)
					: JSON.stringify(registerBody),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (res.status !== 200 && res.status !== 201) {
						throw new Error("Request Failed");
					}
					setEmail("");
					setPassword("");
					return res.json();
				})
				.then((result) => {
					console.log(result);
					isLoggedIn
						? dispatch({
								type: LOGIN_USER,
								payload: {
									token: result.data.login.token,
									userId: result.data.login.userId,
									tokenExp: result.data.login.tokenExp,
								},
						  })
						: console.log(result);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			throw err;
		}
	};
	return (
		<form className="auth-form">
			<h1 className="auth-form-header">{isLoggedIn ? "Login" : "Signup"}</h1>
			<div className="form-control">
				{state.me.token ?? state.me.token}
				<span>E-Mail</span>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-control">
				<span>Password</span>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="form-actions">
				<button type="button" onClick={submitHandler}>
					Submit
				</button>
				<button type="button" onClick={switchModeHandler}>
					Switch to {isLoggedIn ? "Signup" : "login"}
				</button>
			</div>
		</form>
	);
};

export default AuthPage;
