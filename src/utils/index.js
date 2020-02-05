export const arrayToObj = arr => {
	return arr.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
}

export const findById = (arr, id) => arr.find(item => item.id === id);
// Removes duplicated objects from array of object.
export const uniqueArray = arr => [...new Set(arr.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
export const getFormValue = id => document.querySelector(`${id}`).value
// Returns { input: input.value, ... }
export const getFormValues = arr => {
	const obj = {};
	for (let input of arr) {
		obj[input] = document.querySelector(`#${input}`) ? document.querySelector(`#${input}`).value : '';
	};
	return obj;
}

export const checkIfValuesMatch = (v1, v2) => v1 === v2;

export const getFillColor = pos => `rgba(232,${56 + (pos * 12)},20,1)`;
export const getTotalValue = ratings => ratings ? ratings.reduce((total, a) => total += a.value, 0) : 0;
export const getFillWidth = (maxPoint, value = null) => (maxPoint === value) ? 100 : value / maxPoint * 100;