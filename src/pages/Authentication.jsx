import { AuthContent } from "components";
import { useDocumentTitle } from "custom-hooks";

const Authentication = () => {
	useDocumentTitle("Auth | Ripple");
	return <AuthContent />;
};

export { Authentication };
