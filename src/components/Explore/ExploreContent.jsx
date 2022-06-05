import { Posts } from "components";
import { usePosts } from "features";

const ExploreContent = () => {
	const { allPosts } = usePosts();
	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<h2 className="p-5 text-bold">Explore</h2>
			<Posts postData={allPosts} />
		</main>
	);
};

export { ExploreContent };
