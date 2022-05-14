import { db } from "backend/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const getBookmarkDataHandler = (userId, bookmarkDispatch) => {
	(async () => {
		try {
			const userRef = doc(db, "users", userId);
			const userSnapshot = await getDoc(userRef);
			const user = userSnapshot.data();
			bookmarkDispatch({
				type: "ADD_ITEM",
				payload: {
					itemsInBookmark: user?.bookmarks ? user.bookmarks : [],
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};

const addPostToBookmark = (e, userId, updatedValue, bookmarkDispatch) => {
	e.preventDefault();
	(async () => {
		try {
			const userRef = doc(db, "users", userId);
			await updateDoc(userRef, updatedValue);
			bookmarkDispatch({
				type: "ADD_ITEM",
				payload: {
					itemsInBookmark: [...updatedValue.bookmarks],
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};

const removePostFromBookmark = (e, userId, updatedValue, bookmarkDispatch) => {
	e.preventDefault();
	(async () => {
		try {
			const userRef = doc(db, "users", userId);
			await updateDoc(userRef, updatedValue);
			bookmarkDispatch({
				type: "REMOVE_ITEM",
				payload: {
					itemsInBookmark: [...updatedValue.bookmarks],
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};
export { getBookmarkDataHandler, addPostToBookmark, removePostFromBookmark };
