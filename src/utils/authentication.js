import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "backend/firebase/firebase";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	return JSON.parse(localStorage.getItem("user"))?.token ? (
		children
	) : (
		<Navigate to="/auth" state={{ from: location }} replace />
	);
};

const loginHandler = (e, loginState, navigate, location, authDispatch) => {
	e.preventDefault();
	(async () => {
		try {
			const result = await signInWithEmailAndPassword(
				auth,
				loginState.email,
				loginState.password
			);
			const userData = {
				token: result.user.accessToken,
				name: result.user.displayName,
				email: result.user.email,
				avatar: result.user.displayName
					.split(" ")
					.reduce((prev, curr) => prev + curr[0].toUpperCase(), ""),
				uid: result.user.uid,
			};
			authDispatch({
				type: "UPDATE_USER",
				payload: userData,
			});
			localStorage.setItem("user", JSON.stringify(userData));
			navigate(location?.state?.from?.pathname);
		} catch (error) {
			console.log(error);
		}
	})();
};

const registerHandler = (
	e,
	registerState,
	navigate,
	location,
	authDispatch
) => {
	e.preventDefault();
	(async () => {
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				registerState.email,
				registerState.password
			);
			await updateProfile(auth.currentUser, {
				displayName: registerState.firstName + " " + registerState.lastName,
			});
			const userData = {
				token: result.user.accessToken,
				name: result.user.displayName,
				email: result.user.email,
				uid: result.user.uid,
			};
			authDispatch({
				type: "UPDATE_USER",
				payload: userData,
			});
			localStorage.setItem("user", JSON.stringify(userData));
			navigate(location?.state?.from?.pathname);
		} catch (error) {
			console.log(error);
		}
	})();
};

const setValueHandler = (e, field, type, loginDispatch) => {
	const fieldValue = { type: type, payload: {} };
	fieldValue.payload[field] = e.target.value;
	loginDispatch(fieldValue);
};

const setTestHandler = (loginDispatch) =>
	loginDispatch({
		type: "TEST_CREDENTIAL",
		payload: { email: "test@gmail.com", password: "test123" },
	});

const setFocusHandler = (field, value, type, loginDispatch, focusReset) => {
	focusReset[field] = value;
	loginDispatch({ payload: { focus: focusReset }, type: type });
};
export {
	RequireAuth,
	loginHandler,
	registerHandler,
	setValueHandler,
	setTestHandler,
	setFocusHandler,
};
