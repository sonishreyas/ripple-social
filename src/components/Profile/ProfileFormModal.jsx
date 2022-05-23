import { uploadFilesForPost } from "backend/utils";
import { useToast } from "custom-hooks";
import { setShowEditProfile, useUser } from "features";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { profileReducer } from "reducers";

const ProfileFormModal = () => {
	const { userProfile } = useUser();
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const handleSaveProfile = () => {};
	const handleProfileModalDismiss = () =>
		dispatch(setShowEditProfile({ showEditProfile: false }));
	const [profileState, profileDispatch] = useReducer(profileReducer, {
		name: userProfile?.name,
		bio: userProfile?.bio,
		username: userProfile?.username,
		profileURL:
			userProfile?.profileURL || "https://i.stack.imgur.com/l60Hf.png",
		backgroundURL:
			userProfile?.backgroundURL ||
			"https://firebasestorage.googleapis.com/v0/b/ripple-54aa4.appspot.com/o/default%2Fbg-img.jpg?alt=media&token=56416a73-c90a-4c7e-b65d-584453fdbe07",
	});

	const [focus, setFocus] = useState({
		name: false,
		bio: false,
		username: false,
	});
	const setValueHandler = (e, fieldName) => {
		const fieldValue = { type: "UPDATE_PROFILE", payload: {} };
		fieldValue["payload"][fieldName] = e.target.value;
		profileDispatch(fieldValue);
	};
	const setFocusHandler = (payload) => setFocus({ ...focus, ...payload });
	const handleUploadFiles = (e, type, updateType) => {
		uploadFilesForPost(
			{ type: type, payload: e.target.files[0] },
			profileDispatch,
			updateType
		);
	};

	const handleUpdateProfile = () => {
		(async () => {
			try {
				if (profileState.username !== userProfile.username) {
					const checkUsername = await getDocs(
						query(
							collection(db, "users"),
							where("username", "==", profileState.username)
						)
					);
					if (checkUsername.docs.length) {
						showToast.error("Username not available");
					} else {
						dispatch(
							updateUser({
								userId: userProfile.uid,
								updatedValue: { ...userProfile, ...profileState },
							})
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		})();
	};
	return (
		<div className="modal flex-row justify-content-center align-center">
			<div className="modal-background"></div>
			<div className="modal-content p-5 m-5 b-radius-2 card-shadow">
				<h3 className="p-2 my-2 mx-0 text-cta-color text-bold">Edit Profile</h3>
				<form className="input-form flex-column flex-gap-1 flex-grow-1 flex-wrap justify-content-center align-center w-100">
					<div className="basic-card b-radius-2 my-5">
						<section
							className={`input-container flex-column m-5 ${
								profileState?.name?.length > 0 || focus?.name ? "focused" : ""
							}`}
							key="profileForm-name"
						>
							<input
								id="name"
								className="textbox-content p-5"
								type="text"
								name="name"
								onChange={(e) => setValueHandler(e, "name")}
								value={profileState?.name}
								onFocus={() => setFocusHandler({ name: true })}
								onBlur={() => setFocusHandler({ name: false })}
							/>
							<label htmlFor="name" className="textbox-label m-0 px-1">
								Name
							</label>
						</section>
						<section
							className={`input-container flex-column m-5 ${
								profileState?.username.length > 0 || focus.username
									? "focused"
									: ""
							}`}
							key="profileForm-username"
						>
							<input
								id="username"
								className="textbox-content p-5"
								type="text"
								name="username"
								onChange={(e) => setValueHandler(e, "username")}
								value={profileState?.username}
								onFocus={() => setFocusHandler({ username: true })}
								onBlur={() => setFocusHandler({ username: false })}
							/>
							<label htmlFor="username" className="textbox-label m-0 px-1">
								Username
							</label>
						</section>
						<section
							className={`input-container flex-column m-5 ${
								profileState?.bio?.length > 0 || focus?.bio ? "focused" : ""
							}`}
							key="profileForm-bio"
						>
							<input
								id="bio"
								className="textbox-content p-5"
								type="text"
								name="bio"
								onChange={(e) => setValueHandler(e, "bio")}
								value={profileState?.bio}
								onFocus={() => setFocusHandler({ bio: true })}
								onBlur={() => setFocusHandler({ bio: false })}
							/>
							<label htmlFor="bio" className="textbox-label m-0 px-1">
								Bio
							</label>
						</section>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								accept="image/jpeg, image/png, image/svg"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "profile", "profile-img")}
							/>
							<p>Change Profile Picture : </p>
							<i className="fa-solid fa-images social post-icons"></i>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								accept="image/jpeg, image/png, image/svg"
								className="remove-input-file-style"
								onChange={(e) =>
									handleUploadFiles(e, "background", "background-img")
								}
							/>
							<p>Change Background Picture : </p>
							<i className="fa-solid fa-images social post-icons"></i>
						</label>
						<section className="card-footer flex-row flex-grow-1 justify-content-center flex-gap-1 py-5 px-5">
							<button
								className="cursor-pointer primary-btn save-btn p-5 b-radius-2 my-0 text-bold flex-grow-1"
								type="button"
								onClick={handleUpdateProfile}
							>
								Save
							</button>
							<button
								className="cursor-pointer outline-btn cancel-btn p-5 b-radius-2 my-0 text-bold flex-grow-1"
								type="button"
								onClick={handleProfileModalDismiss}
							>
								Cancel
							</button>
						</section>
					</div>
				</form>
			</div>
		</div>
	);
};

export { ProfileFormModal };
