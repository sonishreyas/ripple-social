import { CreatePost, Posts } from ".";

const HomeContent = () => {
	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<CreatePost />
			<Posts />
		</main>
	);
};

export { HomeContent };
