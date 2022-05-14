import { Link } from "react-router-dom";
import { FilesContainer } from ".";

const Posts = () => {
	return (
		<div className="card create-post-container p-5 b-radius-3">
			<div className="card-image-container p-5 b-radius-3 flex-column justify-content-center align-start flex-gap-1">
				<Link
					to={"/profile"}
					className="no-link-decoration flex-row justify-content-start align-start w-100 flex-gap-2 border-bottom pb-5"
				>
					<article className="avatar-container w-max-content">
						<img
							src="https://raw.githubusercontent.com/sonishreyas/rippleUI/dev/components/media/images/profile.jpeg"
							alt="User Profile Picture"
							className="avatar b-radius-circle l"
							aria-label="User Profile Avatar"
						/>
					</article>
					<div className="flex-column justify-content-start align-start flex-gap-1 w-100">
						<h4 className="pb-4 text-bold w-100 border-bottom">Shreyas Soni</h4>
						<p>bio</p>
					</div>
				</Link>
				<div>
					<p>Text</p>
				</div>
				<FilesContainer />
			</div>
		</div>
	);
};

export { Posts };
