import { db } from "backend/firebase/firebase";
import {
	getDoc,
	doc,
	query,
	collection,
	getDocs,
	updateDoc,
} from "firebase/firestore";

const updateUser = async (userId, updatedValue) => {
	try {
		const userRef = doc(db, "users", userId);
		const response = await updateDoc(userRef, updatedValue);
		console.log(response);
		return response;
	} catch (error) {
		return error;
	}
};

const getAllUsers = async () => {
	try {
		const q = query(collection(db, "users"));
		const querySnapshot = await getDocs(q);
		const usersData = [];
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			usersData.push({ id: doc.id, ...data });
		});
		return usersData;
	} catch (error) {
		return error;
	}
};

const getCurrentUser = async (userId, userDispatch) => {
	try {
		const userRef = doc(db, "users", userId);
		const userSnapshot = await getDoc(userRef);
		const user = userSnapshot.data();
		userDispatch({
			type: "SET_USER_PROFILE",
			payload: {
				userProfile: user,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export { getAllUsers, getCurrentUser, updateUser };
