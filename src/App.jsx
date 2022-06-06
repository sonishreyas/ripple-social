import { Outlet, useLocation } from "react-router-dom";
import {
	Header,
	Footer,
	NavBar,
	NewPostModal,
	ConfirmModal,
	ProfileFormModal,
	EditPostModal,
	SideBar,
} from "components";
import {
	usePosts,
	useNavbar,
	useModal,
	getUsers,
	getUser,
	useAuth,
	useUser,
	toggleNavbar,
	getPosts,
} from "features";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppRoutes } from "routes";

function App() {
	const { showNavbar } = useNavbar();
	const { showPostModal, showEditPostModal } = usePosts();
	const { showModal } = useModal();
	const { showEditProfile } = useUser();
	const location = useLocation();

	const dispatch = useDispatch();
	const { uid } = useAuth();

	useEffect(() => {
		if (uid?.length) {
			dispatch(getUsers());
			dispatch(getUser({ uid: uid }));
		}
	}, [uid]);

	useEffect(() => {
		if (window.innerWidth <= 768) dispatch(toggleNavbar({ showNavbar: false }));
		else dispatch(toggleNavbar({ showNavbar: true }));
	}, []);

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	return (
		<div className="grid-container">
			<Header />
			<AppRoutes />
			<Outlet />
			{showNavbar && location.pathname !== "/auth" && <NavBar />}
			{showPostModal && <NewPostModal />}
			{showEditPostModal && <EditPostModal />}
			{showModal && <ConfirmModal />}
			{showEditProfile && <ProfileFormModal />}
			{location.pathname !== "/auth" && <SideBar />}
			<Footer />
		</div>
	);
}

export default App;
