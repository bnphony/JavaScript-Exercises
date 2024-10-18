

// TODO: Book Store

function bookStore() {
    const discounts = {
        1: 8, 2: 7.6, 3: 7.2, 4: 6.4, 5: 6
    };
    
    // *Create the groups
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
    
    // * Main Book Store Function
    const cost = (basket) => {
        // Calculate the total price
        let orderBasket = orderFrequency(basket);
        let options = createOptions(orderBasket.length);
        let groups = createGroups(orderBasket, options);
        return bestOption(groups);
    }
    
    // * Function to find partitions of a number excluding groups with two or more 1's
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
    
    // * Calculate the cost of each combination
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
    
    // * Select the lower cost option
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
    
    // * Order Desc Accordingly the frequence
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
    let baskquet1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3];
    console.log(cost(baskquet1));
}


// TODO: PASCAL TRIANGLE
function pascalTriangle() {
    const rows = (n) => {
        let rowsArray = [];
        let result = '';
        for (let i = 0; i < n; i++) {
            let row = Array(i+1);
            if (rowsArray[i-1]) { // Next Rows
                row[0] = 1;
                for (let j=0, n=rowsArray.length; j < n-1; j++) {
                    let before = rowsArray[n-1];
                    row[j+1] = before[j] + before[j+1];
                }
                row[row.length - 1] = 1;
            } else { // First Row
                row.fill(1);
            }
            result += row.join(' ');
            result += '\n';
            rowsArray.push(row);
        }
        result = result.replace(/\n$/, '');
        let finalResults = result.split('\n');
        finalResults.forEach((row, index) => {
            let padding = ' '.repeat(finalResults.length - index - 1);
            console.log(padding + row.trim());
        });
        console.log(rowsArray);
    };
    rows(5);
    
};



// * END BOOK STORE





// TODO: 





// * Main Function to take the others
export function exercises1() {
    // bookStore();
    pascalTriangle();

}