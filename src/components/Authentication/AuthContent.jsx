import { AuthenticationTabs } from ".";

const AuthContent = () => {
	return (
		<main className="main flex-column align-center justify-content-start flex-gap-1 text-center">
			<div className="homepage-heading">
				<i className="text-cta-color">Ripple</i>
			</div>
			<div className="h1 text-bold my-5">
				Helps you connect and share your work with friends and connections.
			</div>
			<AuthenticationTabs />
		</main>
	);
};
export { AuthContent };
