import { createContext, useContext, useReducer, useState } from "react";
import { modalReducer } from "reducers";
const defaultModalState = {
	message: {},
	handleConfirm: () => {},
	handeDismiss: () => {},
	confirmChoice: "Yes",
	dismissChoice: "No",
};

const ModalContext = createContext({ defaultModalState });

const ModalProvider = ({ children }) => {
	const [modalState, modalDispatch] = useReducer(
		modalReducer,
		defaultModalState
	);
	const [showModal, setShowModal] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				modalState,
				modalDispatch,
				showModal,
				setShowModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };
