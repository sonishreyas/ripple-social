/**
 * Removed element from array
 * @param {Array} arr Array from which we need to remove an element
 * @param {any} element Element that needs to be removed from arr
 * @returns Array with element removed
 */
const removeFromArray = (arr, element) =>
	arr.filter((item) => item !== element);

/**
 * Removed element from array
 * @param {Array} arr Array from which we need to remove an element
 * @param {any} element Element that needs to be removed from arr
 * @returns Array with element removed
 */
const removeObjFromArray = (arr, element) =>
	arr.filter((item) => item?.id !== element);

/**
 * Check if its present in the array
 * @param {Array} arr
 * @param {any} element Element that needs to be searched from arr
 * @returns true if element is found else false
 */
const presentInArray = (arr, element) =>
	arr?.find((item) => item === element) !== undefined ? true : false;

/**
 * Check if its present in the array
 * @param {Array} arr
 * @param {any} element Element that needs to be searched from arr
 * @returns true if element is found else false
 */
const checkIdPresentInArray = (arr, element) =>
	arr?.find((item) => item._id === element) !== undefined ? true : false;

const updateArray = (arr, element) =>
	arr.reduce(
		(prev, curr) =>
			curr.id === element.id
				? [...prev, { ...curr, ...element }]
				: [...prev, { ...curr }],
		[]
	);

const trimData = (data) =>
	(data.length < 40 ? data : data.substr(0, 38)) + "..";

const getUserData = (userId, users) =>
	users.filter((item) => item.uid === userId)[0];

const getPostDataFromId = (data, items) =>
	items.map((_id) => ({
		...data.find((item) => item.id === _id),
	}));

export {
	removeFromArray,
	presentInArray,
	removeObjFromArray,
	updateArray,
	checkIdPresentInArray,
	trimData,
	getUserData,
	getPostDataFromId,
};
