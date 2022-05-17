import { addNewPost } from "backend";
import { useToast } from "custom-hooks";
import { useReducer, useState } from "react";
import { EmojiContainer } from "./EmojiContainer";
import { uploadFilesForPost } from "backend/utils";
import { FilesContainer } from ".";
import {
	usePosts,
	useAuth,
	setShowScheduleDateInput,
	setShowPostModal,
	useModal,
	setModal,
	addPost,
} from "features";
import { postReducer } from "reducers";
import { useDispatch } from "react-redux";

const NewPostModal = () => {
	const { setShowPostModal, showScheduleDateInput } = usePosts();
	const [postState, postDispatch] = useReducer(postReducer, {
		newPost: {
			postText: "",
			fileUrls: [],
			createdAt: "",
		},
	});
	const { showToast } = useToast();
	// const { modalDispatch, setShowModal } = useModal();
	const { uid } = useAuth();
	const dispatch = useDispatch();
	const [showEmojiContainer, setShowEmojiContainer] = useState(false);
	const handleDismissModal = () => setShowModal(false);

	const handleDiscardModal = (e, id) => {
		dispatch(
			setModal({
				message: "Are you sure you want to discard the post ?",
				handleConfirm: handleDismissPostModal,
				handleDismiss: handleDismissModal,
				confirmChoice: "Yes",
				dismissChoice: "No",
			})
		);
		dispatch(setShowModal({ showModal: true }));
		postDispatch({
			type: "RESET_FORM",
			payload: {
				newPost: {
					postText: "",
					fileUrls: [],
				},
			},
		});
		dispatch(setShowScheduleDateInput({ showScheduleDateInput: false }));
	};

	const handleDismissPostModal = () => {
		dispatch(setShowPostModal({ showPostModal: false }));
		dispatch(setShowModal({ showModal: false }));
	};

	const handleEmojiContainer = () =>
		showEmojiContainer
			? setShowEmojiContainer(false)
			: setShowEmojiContainer(true);

	const handleCreatePost = (e) => {
		let newPost, msg;

		msg = `Post created successfully`;
		if (
			!postState?.newPost?.fileUrls?.length &&
			!postState?.newPost?.postText?.length
		) {
			showToast("Please add something to create a post", "error");
		} else {
			if (postState.newPost?.createdAt?.length) {
				newPost = {
					...postState.newPost,
					userId: uid,
				};
				msg = `Post is scheduled on ${postState.newPost.createdAt}`;
			} else {
				newPost = {
					...postState.newPost,
					createdAt: new Date().toISOString(),
					userId: uid,
				};
			}
			dispatch(addPost({ newPost: newPost, showToast: showToast, msg: msg }));
			dispatch(setShowPostModal({ showPostModal: false }));
			postDispatch({
				type: "RESET_FORM",
				payload: {
					newPost: {
						postText: "",
						fileUrls: [],
					},
				},
			});
			dispatch(setShowScheduleDateInput({ showScheduleDateInput: false }));
		}
	};

	const handleUploadFiles = (e, type) => {
		Object.keys(e.target.files).map((i) =>
			uploadFilesForPost(
				{ type: type, payload: e.target.files[i] },
				postDispatch
			)
		);
	};

	return (
		<div className="modal flex-row justify-content-center align-start">
			<div className="modal-background"></div>
			<div className="modal-content p-5 m-5 b-radius-2 card-shadow">
				<div className="flex-row justify-content-space-between align-center flex-gap-1">
					<h3 className="p-2 my-2 mx-0 text-cta-color text-bold">
						Create a Post
					</h3>
					<i
						className="fa-solid fa-circle-xmark social"
						onClick={handleDiscardModal}
					></i>
				</div>
				<textarea
					placeholder="What's in your mind?"
					className="post-text-container my-5 b-radius-1 p-5 w-100"
					value={postState?.newPost?.postText}
					onChange={(e) =>
						postDispatch({
							type: "UPDATE_POST_TEXT",
							payload: {
								newPost: {
									postText: e.target.value,
								},
							},
						})
					}
				/>
				{postState?.newPost?.fileUrls?.length ? (
					<FilesContainer fileUrls={postState?.newPost?.fileUrls} />
				) : (
					<></>
				)}
				<div className="flex-row justify-content-space-between align-center flex-gap-1 flex-wrap w-100">
					<div className="flex-row justify-content-center align-center flex-gap-1">
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept="image/jpeg, image/png, image/svg"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "images")}
							/>
							<i className="fa-solid fa-images social post-icons"></i>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept="video/*"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "videos")}
							/>
							<i className="fa-solid fa-video social post-icons"></i>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept="image/gif"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "gifs")}
							/>
							<p className="text-bold social post-icons">GIF</p>
						</label>
						<label className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer">
							<input
								type="file"
								multiple
								accept=".pdf"
								className="remove-input-file-style"
								onChange={(e) => handleUploadFiles(e, "pdfs")}
							/>
							<i className="fa-solid fa-file-pdf social post-icons"></i>
						</label>
						<span
							className="basic-card b-radius-2 w-max-content p-4 flex-row justify-content-center align-center flex-gap-1 cursor-pointer"
							onClick={handleEmojiContainer}
						>
							<i className="fa-solid fa-face-laugh social post-icons"></i>
						</span>
					</div>
					<div className="flex-row justify-content-center align-center flex-gap-1 w-100">
						{!showScheduleDateInput ? (
							<button
								className="primary-btn p-5 cursor-pointer b-radius-2 flex-grow-1"
								onClick={() =>
									dispatch(
										setShowScheduleDateInput({ showScheduleDataInput: true })
									)
								}
							>
								Schedule Post
							</button>
						) : (
							<div className="flex-row align-center flex-gap-1 flex-wrap">
								<label>
									<p>Created Date : </p>
								</label>
								<input
									type="date"
									name="created-date"
									aria-label="created date"
									className="b-radius-2 p-4 date-input-container flex-grow-1"
									onChange={(e) =>
										postDispatch({
											type: "UPDATE_CREATED_DATE",
											payload: {
												newPost: {
													createdAt: new Date(e.target.value).toISOString(),
												},
											},
										})
									}
								/>
							</div>
						)}
						<button
							className="primary-btn p-5 cursor-pointer b-radius-2 flex-grow-1"
							onClick={handleCreatePost}
						>
							Create Post
						</button>
						<button className="outline-btn p-5 cursor-pointer b-radius-2 flex-grow-1">
							Save Draft
						</button>
					</div>
				</div>
				{showEmojiContainer && (
					<EmojiContainer postState={postState} postDispatch={postDispatch} />
				)}
			</div>
		</div>
	);
};

export { NewPostModal };
