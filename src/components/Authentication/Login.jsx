import { useLocation, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { setValueHandler, setTestHandler, setFocusHandler } from "backend";
import { loginReducer } from "reducers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "features";
const Login = () => {
	const [loginState, loginDispatch] = useReducer(loginReducer, {
		email: "",
		password: "",
		focus: { email: false, password: false },
	});
	const [showPassword, setShowPassword] = useState();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const focusReset = { email: false, password: false };
	const showPasswordHandler = () =>
		showPassword ? setShowPassword(false) : setShowPassword(true);
	const handleLogin = async (e) => {
		e.preventDefault();
		const res = await dispatch(
			login({ email: loginState.email, password: loginState.password })
		);
		console.log("login", res);
		if (res) {
			navigate(location?.state?.from?.pathname);
		}
	};
	return (
		<form
			onSubmit={handleLogin}
			className="input-form login flex-column flex-gap-1 flex-wrap h-auto w-100"
		>
			<section
				className={`input-container flex-column m-5 ${
					loginState.email.length > 0 || loginState.focus.email ? "focused" : ""
				}`}
			>
				<input
					id="email"
					className="textbox-content p-5"
					type="email"
					name="email"
					onChange={(e) =>
						setValueHandler(e, "email", "UPDATE_EMAIL", loginDispatch)
					}
					value={loginState.email}
					onFocus={() =>
						setFocusHandler(
							"email",
							true,
							"UPDATE_FOCUS",
							loginDispatch,
							focusReset
						)
					}
					onBlur={() =>
						setFocusHandler(
							"email",
							false,
							"UPDATE_FOCUS",
							loginDispatch,
							focusReset
						)
					}
				/>
				<label htmlFor="username" className="textbox-label m-0 px-1">
					Email<span className="required-field">*</span>
				</label>
				<sub className="email-check p-2 my-2"></sub>
			</section>
			<section
				className={`input-container flex-column m-5 ${
					loginState.password.length > 0 || loginState.focus.password
						? "focused"
						: ""
				}`}
			>
				<input
					id="password"
					className="textbox-content p-5"
					type={`${showPassword ? "text" : "password"}`}
					name="password"
					onChange={(e) =>
						setValueHandler(e, "password", "UPDATE_PASSWORD", loginDispatch)
					}
					value={loginState.password}
					onFocus={() =>
						setFocusHandler(
							"password",
							true,
							"UPDATE_FOCUS",
							loginDispatch,
							focusReset
						)
					}
					onBlur={() =>
						setFocusHandler(
							"password",
							false,
							"UPDATE_FOCUS",
							loginDispatch,
							focusReset
						)
					}
				/>
				<i
					className={`fas ${
						showPassword ? "fa-eye-slash" : "fa-eye"
					} show-password`}
					id="show-password"
					onClick={showPasswordHandler}
				></i>
				<label htmlFor="password" className="textbox-label m-0 px-1">
					Password<span className="required-field">*</span>
				</label>
				<sub className="password-check p-2 my-2"></sub>
			</section>
			<button
				className="outline-btn p-5 b-radius-2 my-5 mx-0 text-bold cursor-pointer"
				onClick={() => setTestHandler(loginDispatch)}
			>
				Test Credentials
			</button>
			<button className="primary-btn p-5 b-radius-2 my-5 mx-0 text-bold cursor-pointer">
				Login
			</button>
		</form>
	);
};

export { Login };
