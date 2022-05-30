import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { navData } from "./nav-data";
import { toggleNavbar, useNavbar, useUser } from "features";
import { useEffect } from "react";
const NavBar = () => {
	const dispatch = useDispatch();
	const { userProfile } = useUser();
	const { showNavbar } = useNavbar();
	const getActiveClass = ({ isActive }) =>
		isActive
			? "no-link cursor-pointer text-cta-color text-bold"
			: "no-link cursor-pointer";
	const handleHideNavbar = () => dispatch(toggleNavbar({ showNavbar: false }));

	useEffect(() => {
		if (window.innerWidth <= 768) dispatch(toggleNavbar({ showNavbar: false }));
		else dispatch(toggleNavbar({ showNavbar: true }));
	}, []);

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
						<>
							{navData.map(({ id, route, name, icon }) => (
								<li className="rui-drawer-content" key={id}>
									<NavLink
										to={
											route !== "/profile"
												? route
												: `${route}/${userProfile?.username}`
										}
										className={getActiveClass}
									>
										<div className="rui-drawer-links flex-row justify-content-start align-center flex-gap-1 p-5 m-2">
											<span>
												<i className={`${icon}`}></i>
											</span>
											<span className="rui-drawer-content--text">{name}</span>
										</div>
									</NavLink>
								</li>
							))}
						</>
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
