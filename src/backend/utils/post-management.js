import { db } from "backend/firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { storage } from "backend/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const addNewPost = (e, newPost, postDispatch, showToast) => {
	e.preventDefault();
	(async () => {
		try {
			const newPostRef = doc(collection(db, "posts"));
			await setDoc(newPostRef, newPost);
			postDispatch({
				type: "ADD_NEW_POST",
				payload: {
					postData: { _id: newPostRef.id, ...newPost },
				},
			});
			showToast("Post Created Successfully", "success");
		} catch (error) {
			console.log(error);
		}
	})();
};

const uploadFilesForPost = (file, postDispatch) => {
	(async () => {
		try {
			const uploadTask = storage
				.ref(`posts/${file.type}/${file.payload.name}`)
				.put(file.payload);
			await uploadTask.on("state_changed", async () => {
				await storage
					.ref(file.type)
					.child(file.payload.name)
					.getDownloadURL()
					.then((url) => {
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
			});
		} catch (error) {
			console.log(error);
		}
	})();
};
export { addNewPost, uploadFilesForPost };
