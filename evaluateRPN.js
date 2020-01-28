/**
 * Evaluates the given RPN expression.
 *
 * The expression consists of space-separated numbers and operators. The valid operators
 * are `+`, `*`, `-`, and `/`. Both positive and negative numbers are supported.
 *
 * @example
 * evaluateRPN('5 4 +');     // => 9
 * evaluateRPN('5 4 + 2 *'); // => 18
 * evaluateRPN('-5 9 -');    // => -14
 * evaluateRPN('10 2 /');    // => 5
 *
 * @param {string} expr - An RPN expression
 * @returns {number} The number the input expression evaluates to
 */

// Create a function to accept other functions and call them with arguments
function condense(a, b, fn) {
  return fn(a, b);
}

// Define functions for my operations
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

// Create a dictionary of operators:functions
const operationDict = { '+': add, '-': subtract, '*': multiply, '/': divide };

// Define the function for the program
function evaluateRPN(expr) {
  /*
    This is your job. :)

    Make sure you can evaluate the expression by hand before you start
    writing code. Use pencil, paper, index cards, etc. to play with the
    problem and get a feel for how RPN works.

    Play around with an online RPN calculator: https://www.cfd-online.com/Tools/rpncalc.html

    Once you start coding, begin by splitting the string into an array
    of tokens, where each token represents either a number or an operator.
    That is, turn '17 4 + 22 *' into ['17', '4', '+', '22', '*'].

    Useful JavaScript functions:
      - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
      - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
      - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
  */

  // Create an array by splitting the input expresssion
  let elements = expr.split(' ');

  // Convert all numerals in the expression from strings into numbers
  for (let i = 0; i < elements.length; i++) {
    if (Number(elements[i]) || Number(elements[i]) === 0) {
      elements[i] = Number(elements[i]);
    }
  }

  // Handle the special case for a single number passed into the function
  if (elements.length === 1) {
    return elements[0];
  }

  // Use a while loop to call the "condense" function to simplify the expression
  let i = 0;
  while (elements.length >= 3) {
    // If statement to recognize a series [number, number, operator]
    if (typeof elements[i] === 'number' && typeof elements[i + 1] === 'number' && ['+', '-', '*', '/'].includes(elements[i + 2])) {
      // When it recognizes this series, replace those 3 items with the output of "condense"
      elements.splice(i, 3, condense(elements[i], elements[i + 1], operationDict[elements[i + 2]]));
      i = 0;
    } else {
      i++;
    }
  }

  // Return the remaining number in the expression array
  return elements[0];
}

if (require.main === module) {
  console.log('Running sanity checks for evaluateRPN:');

  // Write more of your own sanity checks!

  console.log(evaluateRPN('1 2 +') === 3);
  console.log(evaluateRPN('-12') === -12);
  console.log(evaluateRPN('0') === 0);
  console.log(evaluateRPN('12') === 12);

  console.log(evaluateRPN('5 4 +') === 5 + 4);
  console.log(evaluateRPN('4 5 +') === 4 + 5);

  console.log(evaluateRPN('5 4 -') === 5 - 4);
  console.log(evaluateRPN('4 5 -') === 4 - 5);
  console.log(evaluateRPN('2 10 4 - *') === 2 * (10 - 4));
  console.log(evaluateRPN('0 1 1 1 + - -') === 0 - (1 - (1 + 1)));
}

module.exports = evaluateRPN;
