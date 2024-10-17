

// TODO: Book Store
const normalPrice = 8;
const discounts = {
    1: 8, 2: 7.6, 3: 7.2, 4: 6.4, 5: 6
};

// Create the groups
const createGroups = (basket, options) => {
    let groups = [];
    // console.log('options: ', options);
    let banGroups = [];
    options.forEach((option, optionNumber) => {
        let gAux = [];
        option.forEach(limit => {
            let g = {limit, 'items': []};
            gAux.push(g);
        });
        groups.push(gAux);
        let count = 0;
        basket.forEach(book => {
            let addedToGroup = false;
            // If there no elements, this step is skipted
            for (let group of groups[optionNumber]) {
                if (!group.items.includes(book) && group.items.length < group.limit) {
                    group.items.push(book);
                    count++;
                    addedToGroup = true;
                    break;
                }
            }
        });
        if (count !== basket.length) banGroups.push(optionNumber);
    });

    const finalGroups = groups.filter((group, index) => !banGroups.includes(index));
    return finalGroups;
}

const cost = (basket) => {
    // Calculate the total price
    let orderBasket = orderFrequency(basket);
    let options = createOptions(orderBasket.length);
    let groups = createGroups(orderBasket, options);
    return bestOption(groups);
}
// Function to find partitions of a number excluding groups with two or more 1's
function createOptions(number) {
    let result = [];
    
    function findParts(target, max, current = []) {
        if (target === 0) {
            result.push(current);
            return;
        }

        for (let i = Math.min(max, target); i >= 1; i--) {
            if (i <= 5) {
                findParts(target - i, i, current.concat(i));
            }
        }
    }

    findParts(number, number);
    return result;
}

function calculateTotalCost(partition) {
    let totalCost = 0;
    partition.forEach(group => {
        let groupSize = group.items.length;
        if (discounts[groupSize]) {
            totalCost += groupSize * discounts[groupSize];
        }
    });
    return totalCost;
}

function bestOption(partitions) {
    let minCost = Infinity;
    let best = null;
    partitions.forEach(partition => {
        let totalCost = calculateTotalCost(partition);
        if (totalCost < minCost) {
            minCost = totalCost;
            best = [...partition];
        }
    })
    console.log('Best option:', best, ' = $', minCost);
    return Math.round(minCost * 100);
}




// let baskquet1 =   [2, 2];
// let baskquet1 = [1, 1, 2, 2, 3, 3, 4, 5, 1, 1, 2, 2, 3, 3, 4, 5];
// let baskquet1 = [1, 1, 1, 1, 1];

// let baskquet1 = [1, 1, 2, 3, 4, 4, 5, 5];
let baskquet1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3];


function orderFrequency(basket) {
    // Count the frequency of each item
    let count = {};
    basket.forEach(item => {
        count[item] = (count[item] || 0) + 1;
    });

    // Sort the entries by frequency in descending order
    let orderCount = Object.entries(count).sort((a, b) => b[1] - a[1]);

    // Create the new frequency array by flat mapping over the sorted entries
    let newFrequency = orderCount.flatMap(([item, count]) => Array(count).fill(Number(item)));

    return newFrequency;
}


// * END BOOK STORE





// TODO: 












// * Main Function to take the others
export function exercises1() {
    console.log(cost(baskquet1));

}