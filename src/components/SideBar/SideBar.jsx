import { ProfileButton } from "components/Profile";
import { useAuth, useUser } from "features";
import { Link } from "react-router-dom";
import { presentInArray } from "utils";

const SideBar = () => {
	const { users, userProfile } = useUser();
	const { uid } = useAuth();
	const suggestedUser = users.filter(
		(item) =>
			item.id !== uid && !presentInArray(userProfile?.following, item.id)
	);
	return (
		<aside className="aside">
			<div className="basic-card b-radius-2 p-5">
				<h4 className="text-cta-color text-bold p-5">Suggested Users</h4>
				{suggestedUser?.length &&
					suggestedUser?.map((user) => (
						<div
							className="p-5 flex-row justify-content-space-between align-center w-100"
							key={user?.id}
						>
							<Link to={`profile/${user?.username}`} className="no-link">
								<div className="flex-row justify-content-start align-center">
									<article className="avatar-container w-max-content">
										<img
											src={
												user?.profileURL ||
												"https://i.stack.imgur.com/l60Hf.png"
											}
											alt="User Profile Picture"
											className="avatar b-radius-circle m"
											aria-label="User Profile Avatar"
										/>
									</article>
									<div className="card-content p-5 pb-0">
										<p className="h5 text-bold">{user?.name}</p>
										<p className="py-1">@{user?.username}</p>
									</div>
								</div>
							</Link>
							<div className="flex-row justify-content-end align-center flex-grow-1">
								{presentInArray(userProfile?.following, user?.uid) ? (
									<ProfileButton type="UNFOLLOW" userData={user} />
								) : (
									<ProfileButton type="FOLLOW" userData={user} />
								)}
							</div>
						</div>
					))}
			</div>
		</aside>
	);
};

export { SideBar };
