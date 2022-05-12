import { db } from "backend/firebase/firebase";
import {
	getDoc,
	doc,
	query,
	collection,
	getDocs,
	updateDoc,
} from "firebase/firestore";

const updateUser = (e, userId, updatedValue, usersDispatch) => {
	e.preventDefault();
	(async () => {
		try {
			const userRef = doc(db, "users", userId);
			await updateDoc(userRef, updatedValue);
			usersDispatch({
				type: "UPDATE_USER",
				payload: {
					postsCount: { id: userId, ...updatedValue },
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};

const getAllUsers = (usersDispatch) => {
	(async () => {
		try {
			const q = query(collection(db, "users"));
			const querySnapshot = await getDocs(q);
			const usersData = [];
			querySnapshot.forEach((doc) => {
				let data = doc.data();
				usersData.push({ id: doc.id, ...data });
			});
			usersDispatch({
				type: "GET_ALL_USERS",
				payload: {
					users: usersData,
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};

const getCurrentUser = (userId, usersDispatch) => {
	(async () => {
		try {
			const userRef = doc(db, "users", userId);
			const userSnapshot = await getDoc(userRef);
			const user = userSnapshot.data();
			usersDispatch({
				type: "SET_USER_PROFILE",
				payload: {
					userProfile: user,
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};

export { getAllUsers, getCurrentUser, updateUser };
