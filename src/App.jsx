import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Authentication, Bookmark, Home, PageNotFound, Profile } from "pages";
import {
	Header,
	Footer,
	NavBar,
	NewPostModal,
	ConfirmModal,
	ProfileFormModal,
	EditPostModal,
} from "components";
import { RequireAuth } from "backend";
import {
	usePosts,
	useNavbar,
	useModal,
	getUsers,
	getUser,
	useAuth,
	useUser,
	toggleNavbar,
} from "features";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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

	return (
		<div className="grid-container">
			<Header />
			<Routes>
				<Route path="/auth" element={<Authentication />} />
				<Route
					path="/"
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path="/bookmarks"
					element={
						<RequireAuth>
							<Bookmark />
						</RequireAuth>
					}
				/>
				<Route
					path="/profile/:username"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Outlet />
			{showNavbar && location.pathname !== "/auth" && <NavBar />}
			{showPostModal && <NewPostModal />}
			{showEditPostModal && <EditPostModal />}
			{showModal && <ConfirmModal />}
			{showEditProfile && <ProfileFormModal />}
			<Footer />
		</div>
	);
}

export default App;
