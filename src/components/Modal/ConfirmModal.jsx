import { useModal } from "features";

const ConfirmModal = () => {
	const {
		message,
		confirmChoice,
		dismissChoice,
		handleConfirm,
		handleDismiss,
	} = useModal();
	return (
		<div className="modal flex-row justify-content-center align-center">
			<div className="modal-background"></div>
			<div className="modal-content p-5 m-5 b-radius-2 project-form-container card-shadow">
				<p>{message}</p>
				<section className="card-footer flex-row flex-grow-1 justify-content-center flex-gap-1 py-5 px-0">
					<button
						className="cursor-pointer primary-btn save-btn p-5 b-radius-2 my-0 text-bold flex-grow-1"
						type="button"
						onClick={handleConfirm}
					>
						{confirmChoice}
					</button>
					<button
						className="cursor-pointer outline-btn cancel-btn p-5 b-radius-2 my-0 text-bold flex-grow-1"
						type="button"
						onClick={handleDismiss}
					>
						{dismissChoice}
					</button>
				</section>
			</div>
		</div>
	);
};

export { ConfirmModal };
