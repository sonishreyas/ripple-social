import { useParams } from "react-router-dom";

const ProfileContent = () => {
	const { username } = useParams();
	console.log(username);
	return (
		<main className="main flex-column align-center justify-content-start all-grid-columns flex-gap-1">
			<div className="card profile-card p-5 b-radius-3 flex-column justify-centent-center align-center flex-gap-1">
				<img
					className="background-img w-100 b-radius-3"
					src="https://wallpaperaccess.com/full/1204217.jpg"
					alt="Background image"
				/>
				<article className="avatar-container w-100 text-center">
					<img
						src="https://raw.githubusercontent.com/sonishreyas/rippleUI/dev/components/media/images/profile.jpeg"
						alt="User Profile Picture"
						className="avatar b-radius-circle profile-img"
						aria-label="User Profile Avatar"
					/>
				</article>
				<div className="user-details flex-row justify-centent-space-between align-start w-100">
					<div className="user-container flex-column justify-centent-center align-start w-100">
						<h2 className="p-2 text-bold">Shreyas Soni</h2>
						<h4 className="p-2">@shreyassoni</h4>
						<p className="p-2">Bio</p>
					</div>
					<button>Edit Profile</button>
				</div>
				<div className="flex-row justify-centent-space-between align-start w-100 flex-gap-1">
					<div className="basic-card-primary flex-column justify-content-center align-center flex-grow-1 flex-gap-1 b-radius-3 p-5">
						<h3 className="text-bold">0</h3>
						<h3>Following</h3>
					</div>
					<div className="basic-card-primary flex-column justify-content-center align-center flex-grow-1 flex-gap-1 b-radius-3  p-5">
						<h3 className="text-bold">0</h3>
						<h3>Posts</h3>
					</div>
					<div className="basic-card-primary flex-column justify-content-center align-center flex-grow-1 flex-gap-1 b-radius-3  p-5">
						<h3 className="text-bold">0</h3>
						<h3>Followers</h3>
					</div>
				</div>
			</div>
		</main>
	);
};

export { ProfileContent };
