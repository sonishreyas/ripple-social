import { v4 as uuid } from "uuid";

export const navData = [
	{
		id: uuid(),
		route: "/",
		name: "Home",
		icon: "fa-solid fa-house-chimney",
	},
	{
		id: uuid(),
		route: "/explore",
		name: "Explore",
		icon: "fa-solid fa-compass",
	},
	{
		id: uuid(),
		route: "/bookmarks",
		name: "Bookmarks",
		icon: "fa-solid fa-bookmark",
	},
	{
		id: uuid(),
		route: "/liked",
		name: "Liked",
		icon: "fa-solid fa-thumbs-up",
	},
	{
		id: uuid(),
		route: "/profile",
		name: "Profile",
		icon: "fa-solid fa-user",
	},
];
