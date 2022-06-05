import { useAuth, useUser } from "features";
import { Link } from "react-router-dom";
import { presentInArray } from "utils";

const SideBar = () => {
	const { users, userProfile } = useUser();
	const { uid } = useAuth();
	const suggestedUser = users.filter(
		(item) =>
			item.id !== uid && !presentInArray(userProfile?.userFollowing, item.id)
	);
	return (
		<aside className="aside">
			<div className="basic-card b-radius-2 p-5">
				<h4 className="text-cta-color text-bold p-5">Suggested Users</h4>
				{suggestedUser?.length &&
					suggestedUser?.map(({ id, username, profileURL, name }) => (
						<div
							className="p-5 flex-row justify-content-space-between align-center"
							key={id}
						>
							<Link to={`profile/${username}`} className="no-link">
								<div className="flex-row justify-content-start align-center">
									<article className="avatar-container w-max-content">
										<img
											src={profileURL || "https://i.stack.imgur.com/l60Hf.png"}
											alt="User Profile Picture"
											className="avatar b-radius-circle m"
											aria-label="User Profile Avatar"
										/>
									</article>
									<div className="card-content p-5 pb-0">
										<p className="h5 text-bold">{name}</p>
										<p className="py-1">@{username}</p>
									</div>
								</div>
							</Link>
						</div>
					))}
			</div>
		</aside>
	);
};

export { SideBar };
