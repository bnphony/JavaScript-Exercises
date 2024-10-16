

// TODO: Book Store
const normalPrice = 8;
const discounts = {
    1: 8, 2: 7.6, 3: 7.2, 4: 6.4, 5: 6
};

// Create the groups
const createGroups = (basket, pattern) => {
    let groups = [];
    basket.forEach(book => {
        let addedToGroup = false;
        // If there no elements, this step is skipted
        for (let group of groups) {
            if (!group.includes(book) && group.length < limit) {
                group.push(book);
                addedToGroup = true;
                break;
            }
        }
        // Create a new group and add the book
        if (!addedToGroup) {
            groups.push([book]);
        }
    });
    return groups;
}

const cost = (basket) => {
    // Calculate the total price
    let results = [];
    let total = 0;
    let options = createOptions(basket.length);
    let groups = createGroups(basket, 5);
    let sizes = groups.map(item => item.length);
    let maxSize = Math.max(...sizes);
    if (maxSize >= 3) {
        for (let i=3; i <= maxSize; i++) {
            groups = createGroups(basket, i);
            let total = 0;
            groups.forEach(group => {
                let groupSize = group.length;
                total += groupSize * discounts[groupSize];
            });
            results.push(total);
        }
    } else {
        groups.forEach(group => {
        let groupSize = group.length;
        total += groupSize* discounts[groupSize];
        });
        results.push(total);
        
    }
    return Math.round(Math.min(...results) * 100);
}
// Function to find partitions of a number excluding groups with two or more 1's
function createOptions(number) {
    let result = [];

    function findParts(target, max, current = []) {
        if (target === 0) {
            // Exclude partitions that have more than one 1
            const onesCount = current.filter(n => n === 1).length;
            if (onesCount <= 1) {
                result.push(current);
            }
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




let baskquet1 =  [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3];

// * END BOOK STORE



// TODO: 












// * Main Function to take the others
export function exercises1() {
    console.log(cost(baskquet1));
    

}