import { usePost } from "context";

const NewPostModal = () => {
	const { showPostModal, setShowPostModal } = usePost();

	return (
		<div className="modal flex-row justify-content-center align-center">
			<div className="modal-background"></div>
			<div className="modal-content p-5 m-5 b-radius-2 card-shadow">
				<h3 className="p-2 my-2 mx-0 text-cta-color text-bold">
					Create a Post
				</h3>
			</div>
		</div>
	);
};

export { NewPostModal };
