import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
const NavbarContext = createContext({});

const NavbarProvider = ({ children }) => {
	const [showNavbar, setShowNavbar] = useState(false);
	useEffect(() => {
		if (window.innerWidth <= 768) {
			setShowNavbar(false);
			window.addEventListener("resize", () => setShowNavbar(false));
		} else if (window.innerWidth > 768) {
			setShowNavbar(true);
		} else setShowNavbar(true);
	}, []);
	return (
		<NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
			{children}
		</NavbarContext.Provider>
	);
};

const useNavbar = () => useContext(NavbarContext);

export { useNavbar, NavbarProvider };
