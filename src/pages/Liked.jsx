import { LikedContent } from "components";
import { useDocumentTitle } from "custom-hooks";
const Liked = () => {
	useDocumentTitle("Liked | Ripple");
	return <LikedContent />;
};
export { Liked };
