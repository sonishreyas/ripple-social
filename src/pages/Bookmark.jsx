import { BookmarkContent } from "components";
import { useDocumentTitle } from "custom-hooks";
const Bookmark = () => {
	useDocumentTitle("Bookmarks | Ripple");
	return <BookmarkContent />;
};
export { Bookmark };
