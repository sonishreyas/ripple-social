import { db } from "backend/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const getBookmarkDataHandler = async (userId) => {
	try {
		const userRef = doc(db, "users", userId);
		const userSnapshot = await getDoc(userRef);
		const user = userSnapshot.data();
		return user?.bookmarks ? user.bookmarks : [];
	} catch (error) {
		return error;
	}
};

const addPostToBookmark = async (userId, updatedValue) => {
	try {
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, updatedValue);
		return [...updatedValue.bookmarks];
	} catch (error) {
		return error;
	}
};

const removePostFromBookmark = async (userId, updatedValue) => {
	try {
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, updatedValue);
		return [...updatedValue.bookmarks];
	} catch (error) {
		return error;
	}
};
export { getBookmarkDataHandler, addPostToBookmark, removePostFromBookmark };
