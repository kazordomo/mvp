export const arrayToObj = arr => {
    return arr.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});
}

// Removes duplicated objects from array of object.
export const uniqueArray = arr => [ ...new Set(arr.map(o => JSON.stringify(o))) ].map(s => JSON.parse(s));

export const getFillColor = pos => `rgba(232,${56 + (pos * 12)},20,1)`;
export const getTotalValue = ratings => ratings ? ratings.reduce((total, a) => total += a.value, 0) : 0;
export const getFillWidth = (maxPoint, value = null) => {
    return (maxPoint === value) ? 100 : value / maxPoint * 100;
}