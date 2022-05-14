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
		route: "/drafts",
		name: "Drafts",
		icon: "fa-solid fa-clipboard",
	},
	{
		id: uuid(),
		route: "/profile",
		name: "Profile",
		icon: "fa-solid fa-user",
	},
];
