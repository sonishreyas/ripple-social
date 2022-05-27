import { db } from "backend/firebase/firebase";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
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

const uploadFilesForPost = (file, postDispatch) => {
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
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
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
						postDispatch({
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
				querySnapshot.forEach((doc) => {
					let data = doc.data();
					postsData = postsData.concat({ id: doc.id, ...data });
				});
			})
		);
		return postsData;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const getExplorePost = async () => {
	try {
		const postsData = [];
		const q = query(collection(db, "posts"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			postsData.push({ id: doc.id, ...data });
		});
		return postsData;
	} catch (error) {
		return error;
	}
};
export { addNewPost, uploadFilesForPost, getFeedPost, getExplorePost };
