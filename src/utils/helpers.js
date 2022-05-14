/**
 * Removed element from array
 * @param {Array} arr Array from which we need to remove an element
 * @param {any} element Element that needs to be removed from arr
 * @returns Array with element removed
 */
const removeFromArray = (arr, element) =>
	arr.filter((item) => item._id !== element);

/**
 * Removed element from array
 * @param {Array} arr Array from which we need to remove an element
 * @param {any} element Element that needs to be removed from arr
 * @returns Array with element removed
 */
const removeObjFromArray = (arr, element) =>
	arr.filter((item) => item.addressId !== element);

/**
 * Removed element from array
 * @param {Array} arr Array from which we need to remove an element
 * @param {any} element Element that needs to be removed from arr
 * @returns Array with element removed
 */
const removeFromDateArray = (arr, element) =>
	arr.filter((item) => item !== element);

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

/**
 * Check if id is present in the array of objects
 * @param {Array} arr Array of objects
 * @param {any} element Element id that needs to be searched from arr
 * @returns true if element is found else false
 */
const presentObjInArray = (arr, element) =>
	arr.find((item) => item._id === element) !== undefined ? true : false;

/**
 * Check if id is present in the array of objects
 * @param {Array} arr Array of objects
 * @param {any} element Element id that needs to be searched from arr
 * @returns true if element is found else false
 */
const updateObjInArray = (arr, element) =>
	arr.reduce(
		(prev, curr) =>
			curr._id === element._id
				? [...prev, { ...curr, qty: curr.qty + element.qtyUpdate }]
				: [...prev, { ...curr }],
		[]
	);

/**
 * Check if id is present in the array of objects and update the Address
 * @param {Array} arr Array of objects
 * @param {any} element Element id that needs to be searched from arr
 * @returns true if element is found else false
 */
const updateAddressObjInArray = (arr, element) =>
	arr.reduce(
		(prev, curr) =>
			curr.addressId === element.addressId
				? [...prev, { ...element }]
				: [...prev, { ...curr }],
		[]
	);

const getDataFromId = (items, data) =>
	items.map(({ _id, updatedAt }) => ({
		...data.find((item) => item._id === _id),
		updatedAt,
	}));

const getHabitData = (habits, _id) =>
	habits?.filter((item) => item._id === _id);

const getDataFromPlaylist = (arr, element) =>
	arr.reduce(
		(prev, curr) => (curr._id === element ? { ...prev, ...curr } : { ...prev }),
		{}
	);

const getVideosFromPlaylist = (items, data) =>
	items.map(({ _id }) => ({
		...data.find((item) => item._id === _id),
	}));

const getCountValue = (value) =>
	value > 1000
		? value > 1000000
			? value / 1000000 + "M"
			: value / 1000 + "K"
		: value;

const trimData = (data) =>
	(data.length < 40 ? data : data.substr(0, 38)) + "..";

const updateHabitsDate = (data, updatedData) =>
	data.reduce((prev, curr) => {
		if (curr._id === updatedData._id) {
			if (presentInArray(curr.completedAt, updatedData.completedAt)) {
				const completedAtArray = removeFromDateArray(
					curr.completedAt,
					updatedData.completedAt
				).sort();
				return [...prev, { ...curr, completedAt: [...completedAtArray] }];
			} else {
				return [
					...prev,
					{
						...curr,
						completedAt: [...curr.completedAt, updatedData.completedAt].sort(),
					},
				];
			}
		} else {
			return [...prev, ...curr];
		}
	}, []);

const findDateInArray = (data, date, _id) => {
	return data
		.filter((item) => item._id === _id)[0]
		?.completedAt?.find((item) => item === date) !== undefined
		? true
		: false;
};

const getStreaks = (habitData) => {
	let streak = [];
	let maxStreak = 0;
	let start = 0;
	let end = 0;
	let numOfDays = 0;
	for (let i = 0; i < habitData.length; i++) {
		if (start === 0) {
			start = habitData[i];
		}
		if (
			new Date(habitData[i + 1]).getDate() -
				new Date(habitData[i]).getDate() ===
				1 &&
			i < habitData.length - 1
		) {
			numOfDays++;
		} else if (i === habitData.length - 1 && start === 0) {
			numOfDays++;
			end = habitData[i];
			start = habitData[i];
			streak.push({ start: start, end: end, streak: numOfDays });
			start = 0;
			end = 0;
			if (maxStreak < numOfDays) {
				maxStreak = numOfDays;
			}
		} else {
			numOfDays++;
			end = habitData[i];
			streak.push({ start: start, end: end, streak: numOfDays });
			start = 0;
			end = 0;
			if (maxStreak < numOfDays) {
				maxStreak = numOfDays;
			}
			numOfDays = 0;
		}
	}
	return { streak, maxStreak };
};

const addNoteToHabits = (data, updatedData) =>
	data.reduce(
		(prev, curr) =>
			curr._id === updatedData._id
				? [
						...prev,
						{ ...curr, notes: [...curr.notes, { ...updatedData.notes }] },
				  ]
				: [...prev, ...curr],
		[]
	);

const deleteNoteFromHabits = (data, updatedData) =>
	data.reduce(
		(prev, curr) =>
			curr._id === updatedData._id
				? [
						...prev,
						{
							...curr,
							notes: curr.notes.filter(
								(item) => item._id !== updatedData.notes._id
							),
						},
				  ]
				: [...prev, ...curr],
		[]
	);

const getUserData = (userId, users) =>
	users.filter((item) => item.uid === userId)[0];

export {
	removeFromArray,
	removeFromDateArray,
	presentInArray,
	presentObjInArray,
	removeObjFromArray,
	updateObjInArray,
	updateAddressObjInArray,
	getDataFromId,
	checkIdPresentInArray,
	getDataFromPlaylist,
	getVideosFromPlaylist,
	getCountValue,
	trimData,
	updateHabitsDate,
	findDateInArray,
	getHabitData,
	getStreaks,
	addNoteToHabits,
	deleteNoteFromHabits,
	getUserData,
};
