import { db } from "backend/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const getLikeDataHandler = async (userId) => {
	try {
		const userRef = doc(db, "users", userId);
		const userSnapshot = await getDoc(userRef);
		const user = userSnapshot.data();
		return user?.liked ? user.liked : [];
	} catch (error) {
		return error;
	}
};

const addPostToLike = async (userId, updatedValue) => {
	try {
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, updatedValue);
		return [...updatedValue.liked];
	} catch (error) {
		return error;
	}
};

const removePostFromLike = async (userId, updatedValue) => {
	try {
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, updatedValue);
		return [...updatedValue.liked];
	} catch (error) {
		return error;
	}
};

const updateLikesData = async (postId, updatedValue) => {
	try {
		const postRef = doc(db, "posts", postId);
		console.log("post-update", updatedValue);
		await updateDoc(postRef, updatedValue);
		return updatedValue;
	} catch (error) {
		return error;
	}
};
export {
	getLikeDataHandler,
	addPostToLike,
	removePostFromLike,
	updateLikesData,
};
