import { ExploreContent } from "components";
import { useDocumentTitle } from "custom-hooks";
const Explore = () => {
	useDocumentTitle("Explore | Ripple");
	return <ExploreContent />;
};
export { Explore };
