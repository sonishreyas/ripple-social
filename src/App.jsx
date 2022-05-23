import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Authentication, Bookmark, Home, Profile } from "pages";
import { Header, Footer, NavBar, NewPostModal, ConfirmModal } from "components";
import { RequireAuth } from "backend";
import {
	usePosts,
	useNavbar,
	useModal,
	getUsers,
	getUser,
	useAuth,
} from "features";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
	const { showNavbar } = useNavbar();
	const { showPostModal } = usePosts();
	const { showModal } = useModal();
	const location = useLocation();

	const dispatch = useDispatch();
	const { uid } = useAuth();

	useEffect(() => {
		if (uid?.length) {
			dispatch(getUsers());
			dispatch(getUser({ uid: uid }));
		}
	}, [uid]);
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
			</Routes>
			<Outlet />
			{showNavbar && location.pathname !== "/auth" && <NavBar />}
			{showPostModal && <NewPostModal />}
			{showModal && <ConfirmModal />}
			<Footer />
		</div>
	);
}

export default App;
