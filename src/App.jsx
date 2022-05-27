import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Authentication, Bookmark, Home } from "pages";
import { Header, Footer, NavBar, NewPostModal, ConfirmModal } from "components";
import { RequireAuth } from "backend";
import { usePosts, useNavbar, useModal } from "features";

function App() {
	const { showNavbar } = useNavbar();
	const { showPostModal } = usePosts();
	const { showModal } = useModal();
	const location = useLocation();
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
