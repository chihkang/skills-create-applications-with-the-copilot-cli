#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Calculator class with basic arithmetic operations
class Calculator {
  // Addition operation
  add(a, b) {
    return a + b;
  }

  // Subtraction operation
  subtract(a, b) {
    return a - b;
  }

  // Multiplication operation
  multiply(a, b) {
    return a * b;
  }

  // Division operation with zero check
  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }

  // Main calculation method
  calculate(firstNumber, operation, secondNumber) {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      throw new Error('Invalid input: please provide valid numbers');
    }

    switch (operation) {
      case '+':
        return this.add(num1, num2);
      case '-':
        return this.subtract(num1, num2);
      case '*':
        return this.multiply(num1, num2);
      case '/':
        return this.divide(num1, num2);
      default:
        throw new Error('Invalid operation. Supported operations: +, -, *, /');
    }
  }
}

// CLI interface
function main() {
  const calculator = new Calculator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: calculator <number1> <operation> <number2>');
    console.log('Example: calculator 10 + 5');
    console.log('\nSupported operations:');
    console.log('  + : Addition');
    console.log('  - : Subtraction');
    console.log('  * : Multiplication');
    console.log('  / : Division');
    process.exit(0);
  }

  if (args.length !== 3) {
    console.error('Error: Please provide exactly three arguments (number, operation, number)');
    process.exit(1);
  }

  try {
    const result = calculator.calculate(args[0], args[1], args[2]);
    console.log(`${args[0]} ${args[1]} ${args[2]} = ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = Calculator;

// Only run main if this file is executed directly
if (require.main === module) {
  main();
}
