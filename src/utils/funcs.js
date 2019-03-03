export const arrayToObj = arr => {
    return arr.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});
}

export const getTotalValue = obj => obj.ratings.reduce((total, a) => total += a.value, 0);