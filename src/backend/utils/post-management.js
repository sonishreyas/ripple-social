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
export { addNewPost, uploadFilesForPost };
