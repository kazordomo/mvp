export const arrayToObj = arr => {
    return arr.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});
}

// Return false rather than undefined if nothing is found.
export const findById = (arr, id) => arr.find(item => item.id === id) ? arr.find(item => item.id === id) : false;
// Removes duplicated objects from array of object.
export const uniqueArray = arr => [ ...new Set(arr.map(o => JSON.stringify(o))) ].map(s => JSON.parse(s));

export const getFillColor = pos => `rgba(232,${56 + (pos * 12)},20,1)`;
export const getTotalValue = ratings => ratings ? ratings.reduce((total, a) => total += a.value, 0) : 0;
export const getFillWidth = (maxPoint, value = null) => (maxPoint === value) ? 100 : value / maxPoint * 100;