export const arrayToObj = arr => {
    return arr.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});
}

export const getFillColor = pos => `rgba(232,${56 + (pos * 12)},20,1)`;
export const getTotalValue = obj => obj.ratings.reduce((total, a) => total += a.value, 0);
export const getFillWidth = (player, maxPoint) => 
    (maxPoint === getTotalValue(player)) ? 100 : getTotalValue(player) / maxPoint * 100;