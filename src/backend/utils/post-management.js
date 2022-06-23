import { db } from "backend/firebase/firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { storage } from "backend/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const addNewPost = async (newPost, showToast, msg) => {
	try {
		const newPostRef = doc(collection(db, "posts"));
		await setDoc(newPostRef, newPost);
		showToast(msg, "success");
		return { _id: newPostRef.id, ...newPost };
	} catch (error) {
		return error;
	}
};

const uploadFilesForPost = (
	file,
	dispatch,
	update = "post",
	setProfileLoader,
	setBackgroundLoader
) => {
	(async () => {
		try {
			const storageRef = ref(storage, `${file.type}/` + file.payload.name);
			const uploadTask = uploadBytesResumable(storageRef, file.payload);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					if (update === "profile-img") {
						setProfileLoader(progress);
					} else if (update === "background-img") {
						setBackgroundLoader(progress);
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case "storage/unauthorized":
							// User doesn't have permission to access the object
							break;
						case "storage/canceled":
							// User canceled the upload
							break;

						// ...

						case "storage/unknown":
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						if (update === "post")
							dispatch({
								type: "UPDATE_UPLOADED_URL",
								payload: {
									newPost: {
										fileUrls: {
											type: file.type,
											url: url,
										},
									},
								},
							});
						else if (update === "profile-img")
							dispatch({
								type: "UPDATE_PROFILE_URL",
								payload: {
									profileURL: url,
								},
							});
						else if (update === "background-img")
							dispatch({
								type: "UPDATE_BACKGROUND_URL",
								payload: {
									backgroundURL: url,
								},
							});
					});
				}
			);
		} catch (error) {
			console.log(error);
		}
	})();
};

const getFeedPost = async (userFollowing) => {
	try {
		let postsData = [];
		await Promise.all(
			userFollowing.map(async (item) => {
				const q = query(collection(db, "posts"), where("userId", "==", item));
				const querySnapshot = await getDocs(q);
				const date = new Date().toISOString();
				querySnapshot.forEach((doc) => {
					let data = doc.data();
					if (new Date(data.createdAt) < new Date(date)) {
						postsData = postsData.concat({ id: doc.id, ...data });
					}
				});
			})
		);
		return postsData;
	} catch (error) {
		return error;
	}
};

const getExplorePost = async () => {
	try {
		const postsData = [];
		const q = query(collection(db, "posts"));
		const querySnapshot = await getDocs(q);
		const date = new Date().toISOString();
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			new Date(data.createdAt) < new Date(date) &&
				postsData.push({ id: doc.id, ...data });
		});
		return postsData;
	} catch (error) {
		return error;
	}
};

const deletePostHandler = async (postId) => {
	try {
		const postRef = doc(db, "posts", postId);
		await deleteDoc(postRef);
		return postId;
	} catch (error) {
		return error;
	}
};

const editPostHandler = async (postId, updatedValue, showToast, msg = "") => {
	try {
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, updatedValue);
		msg.length && showToast(msg, "success");
		return updatedValue;
	} catch (error) {
		return error;
	}
};
export {
	addNewPost,
	uploadFilesForPost,
	getFeedPost,
	getExplorePost,
	deletePostHandler,
	editPostHandler,
};
