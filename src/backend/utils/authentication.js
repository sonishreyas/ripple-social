import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth, db } from "backend/firebase/firebase";
import { Navigate, useLocation } from "react-router-dom";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	return JSON.parse(localStorage.getItem("user"))?.token ? (
		children
	) : (
		<Navigate to="/auth" state={{ from: location }} replace />
	);
};

const loginHandler = async (email, password) => {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		const userData = {
			token: result.user.accessToken,
			name: result.user.displayName,
			email: result.user.email,
			uid: result.user.uid,
		};
		return userData;
	} catch (error) {
		return error;
	}
};

const registerHandler = (registerData) => {
	(async () => {
		try {
			if (!registerData.username.length)
				toast.error("Username cannot be empty");
			else {
				const checkUsername = await getDocs(
					query(
						collection(db, "users"),
						where("username", "==", registerData.username)
					)
				);
				if (checkUsername.docs.length) {
					toast.error("Username not available");
				} else {
					const result = await createUserWithEmailAndPassword(
						auth,
						registerData.email,
						registerData.password
					);
					const userData = {
						token: result.user.accessToken,
						name: result.user.displayName,
						email: result.user.email,
						uid: result.user.uid,
						username: registerData.username,
					};
					localStorage.setItem("user", JSON.stringify(userData));
					const newUserRef = doc(db, "users", userData.uid);
					await setDoc(newUserRef, {
						...userData,
						followers: [],
						following: [],
						bookmarks: [],
					});
					// showToast("User registered successfully..", "success");
					return userData;
				}
			}
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
