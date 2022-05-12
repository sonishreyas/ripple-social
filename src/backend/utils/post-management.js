import { db } from "backend/firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const addNewPost = (e, postState, postDispatch) => {
	e.preventDefault();
	(async () => {
		try {
			const newPostRef = doc(collection(db, "posts"));
			await setDoc(newPostRef, postState.newPost);
			postDispatch({
				type: "ADD_NEW_POST",
				payload: {
					postData: { _id: newPostRef.id, ...postState.newPost },
				},
			});
		} catch (error) {
			console.log(error);
		}
	})();
};

export { addNewPost };
