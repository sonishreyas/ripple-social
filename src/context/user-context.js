import { getAllUsers, getCurrentUser } from "backend";
import { useReducer, createContext, useContext, useEffect } from "react";
import { userReducer } from "../reducers";

const defaultUserState = {
	userProfile: {},
	users: [],
};

const UserContext = createContext({ defaultUserState });

const UserProvider = ({ children }) => {
	const [userState, userDispatch] = useReducer(userReducer, defaultUserState);
	// const { authState } = useAuth();
	// useEffect(() => {
	// 	if (authState.uid.length) {
	// 		getAllUsers(userDispatch);
	// 		getCurrentUser(authState.uid, userDispatch);
	// 	}
	// }, [authState]);
	return (
		<UserContext.Provider value={{ userState, userDispatch }}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
