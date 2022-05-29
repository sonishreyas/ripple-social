import { ProfileContent } from "components";
import { useDocumentTitle } from "custom-hooks";
const Profile = () => {
	useDocumentTitle("Profile | Ripple");
	return <ProfileContent />;
};
export { Profile };
