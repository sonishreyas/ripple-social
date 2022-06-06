import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme, toggleTheme, toggleNavbar, useUser, logout } from "features";
import { useEffect, useState } from "react";
import { useDebounce } from "custom-hooks";

const Header = () => {
	const { themeIcon } = useTheme();
	const dispatch = useDispatch();
	const location = useLocation();
	const { users } = useUser();
	const navigate = useNavigate();
	const getActiveClass = ({ isActive }) =>
		isActive
			? "no-link cursor-pointer text-cta-color text-bold"
			: "no-link cursor-pointer";
	const handleShowNavbar = () => dispatch(toggleNavbar({ showNavbar: true }));
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearch = (e) => setSearchQuery(e.target.value);
	const debounceSearch = useDebounce(searchQuery, 500);
	const [searchUser, setSearchUser] = useState([]);
	useEffect(() => {
		debounceSearch.length
			? setSearchUser(
					users.filter((user) =>
						user?.name.toLowerCase().includes(debounceSearch.toLowerCase())
					)
			  )
			: setSearchUser([]);
	}, [debounceSearch]);
	useEffect(() => {
		setSearchQuery("");
		setSearchUser([]);
	}, []);
	return (
		<header className="header header-shadow flex-column">
			<div className="flex-row justify-content-space-between align-center w-100">
				<div className="brand-info flex-row justify-content-center align-center flex-gap-1 m-5">
					{location.pathname !== "/auth" && (
						<section>
							<i
								className="fas fa-bars header-nav-icon"
								onClick={handleShowNavbar}
							></i>
						</section>
					)}
					<Link to={"/"} className="no-link header-brand">
						<img
							src="https://raw.githubusercontent.com/sonishreyas/rippleUI/dev/components/media/images/ripple-logo.png"
							alt="Logo of ripple UI"
							className="brand-logo"
						/>
						<sub className="brand-name">Ripple</sub>
					</Link>
				</div>
				<div className="social-icon-container flex-row align-center flex-gap-2">
					<ul className="no-list spaced-list flex-row align-center flex-gap-2 mx-5">
						<li className="search-bar h-auto">
							<form className="input-form flex-column flex-gap-1 flex-grow-1 flex-wrap h-auto w-100">
								<section className="input-container flex-column b-radius-1 m-5">
									<input
										id="search"
										className="textbox-content p-5"
										type="text"
										name="search"
										placeholder="Search users..."
										aria-label="Search users here"
										onChange={handleSearch}
										value={searchQuery}
									/>
									<i className="fas fa-search search-icon"></i>
								</section>
							</form>
							{searchUser?.length ? (
								<div className="search-user-container w-100">
									<ul className="no-list">
										{searchUser.map(({ id, username, profileURL, name }) => (
											<li className="no-list p-5 search-list" key={id}>
												<Link to={`profile/${username}`} className="no-link">
													<div className="flex-row justify-content-start align-center">
														<article className="avatar-container w-max-content">
															<img
																src={
																	profileURL ||
																	"https://i.stack.imgur.com/l60Hf.png"
																}
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
											</li>
										))}
									</ul>
								</div>
							) : (
								<></>
							)}
						</li>
						<li className="header-theme-small-icon h-auto pr-2 cursor-pointer">
							<span className="social">
								<i
									className={`fas fa-right-from-bracket theme-icon social`}
									aria-label="Logout"
									title="Logout"
									onClick={() => dispatch(logout())}
								></i>
							</span>
						</li>
						<li className="header-theme-small-icon h-auto pr-2 cursor-pointer">
							<span className="social">
								<i
									className={`fas fa-${themeIcon} theme-icon social`}
									aria-label="dark/light theme icon"
									title="dark/light theme icon"
									onClick={() => {
										dispatch(toggleTheme());
										navigate("/");
									}}
								></i>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export { Header };
