import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Authentication, Home } from "pages";
import { Header, Footer, NavBar, NewPostModal } from "components";
import { useNavbar, usePost } from "context";
import { RequireAuth } from "utils";
function App() {
	const { showNavbar } = useNavbar();
	const { showPostModal } = usePost();
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
			</Routes>
			<Outlet />
			{showNavbar && location.pathname !== "/auth" && <NavBar />}
			{showPostModal && <NewPostModal />}
			<Footer />
		</div>
	);
}

export default App;
