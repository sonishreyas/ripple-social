import { useNavbar, useAuth } from "../../context";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	const { setShowNavbar } = useNavbar();
	const { authState } = useAuth();

	const getActiveClass = ({ isActive }) =>
		isActive
			? "no-link cursor-pointer text-cta-color text-bold"
			: "no-link cursor-pointer";
	const handleHideNavbar = () => setShowNavbar(false);
	return (
		<div className="nav-container p-0 m-0 w-100 h-auto flex-row">
			<div className="nav-content p-0 m-0">
				<nav className="nav nav-shadow p-0 m-0">
					<ul className="rui-drawer-content--list no-list">
						<li className="flex-row justify-content-space-between align-center rui-drawer-content rui-drawer-header">
							<Link to={"/"} className="no-link">
								<img
									src="https://raw.githubusercontent.com/sonishreyas/rippleUI/dev/components/media/images/ripple-logo.png"
									alt="Logo of ripple UI"
									className="brand-logo"
								/>
								<sub className="brand-name">Ripple</sub>
							</Link>
							<section>
								<i
									className="fas fa-angle-left close-drawer"
									onClick={handleHideNavbar}
								></i>
							</section>
						</li>
						<li className="rui-drawer-content">
							<NavLink to={"/"} className={getActiveClass}>
								<div className="rui-drawer-links">
									<span className="rui-drawer-content--text">Home</span>
								</div>
							</NavLink>
						</li>
						<li className="rui-drawer-content">
							<NavLink to={"/dashboard"} className={getActiveClass}>
								<div className="rui-drawer-links">
									<span className="rui-drawer-content--text">Dashboard</span>
								</div>
							</NavLink>
						</li>
						<li className="rui-drawer-content">
							<NavLink to={"/habits"} className={getActiveClass}>
								<div className="rui-drawer-links">
									<span className="rui-drawer-content--text">My Habits</span>
								</div>
							</NavLink>
						</li>
						<li className="rui-drawer-content">
							<NavLink to={"/profile"} className={getActiveClass}>
								<div className="rui-drawer-links">
									<span className="rui-drawer-content--text">
										{authState.token ? "Profile" : "SignIn"}
									</span>
								</div>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<div
				className="nav-background w-100 h-100"
				onClick={handleHideNavbar}
			></div>
		</div>
	);
};
export { NavBar };
