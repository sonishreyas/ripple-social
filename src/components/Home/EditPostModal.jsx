import { useToast } from "custom-hooks";
import { useReducer, useState } from "react";
import { EmojiContainer } from "./EmojiContainer";
import { uploadFilesForPost } from "backend/utils";
import {
	useAuth,
	setShowScheduleDateInput,
	setShowPostModal,
	setModal,
	addPost,
	setShowModal,
	setShowEditPostModal,
	usePosts,
	editPost,
} from "features";
import { postReducer } from "reducers";
import { useDispatch } from "react-redux";
import { FilesContainer } from ".";

const EditPostModal = () => {
	const { editPostData } = usePosts();
	const [postState, postDispatch] = useReducer(postReducer, {
		newPost: {
			postText: editPostData?.postText,
			fileUrls: editPostData?.fileUrls,
			id: editPostData?.id,
		},
	});
	const { showToast } = useToast();
	const { uid } = useAuth();
	const dispatch = useDispatch();
	const [showEmojiContainer, setShowEmojiContainer] = useState(false);
	const handleDismissModal = () =>
		dispatch(setShowPostModal({ showModal: false }));

	const handleDiscardModal = (e, id) => {
		dispatch(
			setModal({
				message: "Are you sure you want to discard the changes ?",
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
		dispatch(setShowEditPostModal(false));
		dispatch(setShowModal({ showModal: false }));
	};

	const handleEmojiContainer = () =>
		showEmojiContainer
			? setShowEmojiContainer(false)
			: setShowEmojiContainer(true);

	const handleEditPost = (e) => {
		let updatePost, msg;

		msg = `Post updated successfully`;
		if (
			!postState?.newPost?.fileUrls?.length &&
			!postState?.newPost?.postText?.length
		) {
			showToast("Please add something to update a post", "error");
		} else {
			updatePost = {
				...postState.newPost,
			};

			dispatch(
				editPost({
					postId: updatePost?.id,
					updatedValue: updatePost,
					showToast: showToast,
					msg: msg,
				})
			);
			dispatch(setShowEditPostModal(false));
			postDispatch({
				type: "RESET_FORM",
				payload: {
					newPost: {
						postText: "",
						fileUrls: [],
					},
				},
			});
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
						<button
							className="primary-btn p-5 cursor-pointer b-radius-2 flex-grow-1"
							onClick={handleEditPost}
						>
							Update Post
						</button>
					</div>
					{showEmojiContainer && (
						<EmojiContainer postState={postState} postDispatch={postDispatch} />
					)}
				</div>
			</div>
		</div>
	);
};

export { EditPostModal };
