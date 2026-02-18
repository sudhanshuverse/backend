// Normal functions

function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


// Export the functions
module.exports = {
    addFn: add,
    subFun: subtract,
    mulFun: multiply
};