import {
	Authentication,
	Bookmark,
	Home,
	PageNotFound,
	Profile,
	Liked,
	Explore,
} from "pages";

import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "routes";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/auth" element={<Authentication />} />
			<Route element={<RequireAuth />}>
				<Route path="/" element={<Home />} />
				<Route path="/bookmarks" element={<Bookmark />} />
				<Route path="/profile/:username" element={<Profile />} />
				<Route path="/liked" element={<Liked />} />
				<Route path="/explore" element={<Explore />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export { AppRoutes };
