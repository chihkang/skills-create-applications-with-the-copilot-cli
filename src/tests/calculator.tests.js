const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition (+)', () => {
    test('should add two positive numbers: 2 + 3 = 5', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add positive and negative numbers', () => {
      expect(calculator.add(10, -5)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(calculator.add(-10, -5)).toBe(-15);
    });

    test('should add zero to a number', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });

    test('should add decimal numbers', () => {
      expect(calculator.add(2.5, 1.5)).toBe(4);
    });

    test('should handle large numbers', () => {
      expect(calculator.add(1000000, 2000000)).toBe(3000000);
    });
  });

  describe('Subtraction (-)', () => {
    test('should subtract two positive numbers: 10 - 4 = 6', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract negative numbers', () => {
      expect(calculator.subtract(10, -5)).toBe(15);
    });

    test('should subtract and get negative result', () => {
      expect(calculator.subtract(5, 10)).toBe(-5);
    });

    test('should subtract zero from a number', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
    });

    test('should subtract decimal numbers', () => {
      expect(calculator.subtract(5.5, 2.5)).toBe(3);
    });

    test('should handle subtraction with same numbers (result = 0)', () => {
      expect(calculator.subtract(7, 7)).toBe(0);
    });
  });

  describe('Multiplication (*)', () => {
    test('should multiply two positive numbers: 45 * 2 = 90', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('should multiply positive and negative numbers', () => {
      expect(calculator.multiply(5, -3)).toBe(-15);
    });

    test('should multiply two negative numbers', () => {
      expect(calculator.multiply(-4, -6)).toBe(24);
    });

    test('should multiply by zero', () => {
      expect(calculator.multiply(100, 0)).toBe(0);
    });

    test('should multiply by one', () => {
      expect(calculator.multiply(42, 1)).toBe(42);
    });

    test('should multiply decimal numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should handle large number multiplication', () => {
      expect(calculator.multiply(1000, 2000)).toBe(2000000);
    });
  });

  describe('Division (/)', () => {
    test('should divide two positive numbers: 20 / 5 = 4', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });

    test('should divide positive and negative numbers', () => {
      expect(calculator.divide(20, -4)).toBe(-5);
    });

    test('should divide two negative numbers', () => {
      expect(calculator.divide(-20, -4)).toBe(5);
    });

    test('should divide and get decimal result', () => {
      expect(calculator.divide(10, 3)).toBeCloseTo(3.333, 2);
    });

    test('should divide by one', () => {
      expect(calculator.divide(42, 1)).toBe(42);
    });

    test('should divide zero by a number', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    test('should divide decimal numbers', () => {
      expect(calculator.divide(7.5, 2.5)).toBe(3);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero');
    });

    test('should throw error when dividing zero by zero', () => {
      expect(() => calculator.divide(0, 0)).toThrow('Cannot divide by zero');
    });
  });

  describe('Calculate method (main CLI logic)', () => {
    test('should calculate 2 + 3 = 5', () => {
      expect(calculator.calculate('2', '+', '3')).toBe(5);
    });

    test('should calculate 10 - 4 = 6', () => {
      expect(calculator.calculate('10', '-', '4')).toBe(6);
    });

    test('should calculate 45 * 2 = 90', () => {
      expect(calculator.calculate('45', '*', '2')).toBe(90);
    });

    test('should calculate 20 / 5 = 4', () => {
      expect(calculator.calculate('20', '/', '5')).toBe(4);
    });

    test('should handle string inputs and convert to numbers', () => {
      expect(calculator.calculate('15', '+', '25')).toBe(40);
    });

    test('should handle decimal string inputs', () => {
      expect(calculator.calculate('5.5', '+', '4.5')).toBe(10);
    });

    test('should throw error for invalid operation', () => {
      expect(() => calculator.calculate('5', '&', '3')).toThrow('Invalid operation');
    });

    test('should throw error for invalid first number', () => {
      expect(() => calculator.calculate('abc', '+', '5')).toThrow('Invalid input');
    });

    test('should throw error for invalid second number', () => {
      expect(() => calculator.calculate('5', '+', 'xyz')).toThrow('Invalid input');
    });

    test('should throw error when dividing by zero in calculate', () => {
      expect(() => calculator.calculate('10', '/', '0')).toThrow('Cannot divide by zero');
    });

    test('should handle negative string inputs', () => {
      expect(calculator.calculate('-5', '+', '10')).toBe(5);
    });

    test('should handle all operations case-sensitivity', () => {
      expect(calculator.calculate('10', '+', '5')).toBe(15);
      expect(calculator.calculate('10', '-', '5')).toBe(5);
      expect(calculator.calculate('10', '*', '5')).toBe(50);
      expect(calculator.calculate('10', '/', '5')).toBe(2);
    });
  });

  describe('Modulo (%)', () => {
    test('should calculate modulo: 10 % 3 = 1', () => {
      expect(calculator.modulo(10, 3)).toBe(1);
    });

    test('should calculate modulo example from image: 5 % 2 = 1', () => {
      expect(calculator.modulo(5, 2)).toBe(1);
    });

    test('should handle modulo with negative numbers', () => {
      expect(calculator.modulo(-10, 3)).toBe(-1);
    });

    test('should return 0 when number is divisible', () => {
      expect(calculator.modulo(10, 2)).toBe(0);
    });

    test('should handle large numbers modulo', () => {
      expect(calculator.modulo(1000, 7)).toBe(6);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.modulo(10, 0)).toThrow('Cannot perform modulo with zero divisor');
    });
  });

  describe('Exponentiation (^)', () => {
    test('should calculate power: 2 ^ 8 = 256', () => {
      expect(calculator.power(2, 8)).toBe(256);
    });

    test('should calculate power example from image: 2 ^ 3 = 8', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('should handle power of 0', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    test('should handle power of 1', () => {
      expect(calculator.power(5, 1)).toBe(5);
    });

    test('should handle negative exponents', () => {
      expect(calculator.power(2, -1)).toBe(0.5);
    });

    test('should handle fractional exponents', () => {
      expect(calculator.power(4, 0.5)).toBe(2);
    });

    test('should calculate base ^ base', () => {
      expect(calculator.power(3, 3)).toBe(27);
    });
  });

  describe('Square Root (√)', () => {
    test('should calculate square root: √16 = 4', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate square root example from image: √16 = 4', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate square root of 0', () => {
      expect(calculator.squareRoot(0)).toBe(0);
    });

    test('should calculate square root with decimal result', () => {
      expect(calculator.squareRoot(2)).toBeCloseTo(1.414, 2);
    });

    test('should calculate square root of perfect squares', () => {
      expect(calculator.squareRoot(4)).toBe(2);
      expect(calculator.squareRoot(9)).toBe(3);
      expect(calculator.squareRoot(25)).toBe(5);
      expect(calculator.squareRoot(100)).toBe(10);
    });

    test('should calculate square root of decimal number', () => {
      expect(calculator.squareRoot(2.25)).toBe(1.5);
    });

    test('should handle square root of 1', () => {
      expect(calculator.squareRoot(1)).toBe(1);
    });

    test('should throw error when calculating square root of negative number', () => {
      expect(() => calculator.squareRoot(-9)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for negative 1', () => {
      expect(() => calculator.squareRoot(-1)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for large negative numbers', () => {
      expect(() => calculator.squareRoot(-100)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should calculate square root of decimal number', () => {
      expect(calculator.squareRoot(2.25)).toBe(1.5);
    });

    test('should throw error when calculating square root of negative number', () => {
      expect(() => calculator.squareRoot(-9)).toThrow('Cannot calculate square root of a negative number');
    });
  });

  describe('Advanced calculate method tests', () => {
    test('should calculate modulo: 10 % 3', () => {
      expect(calculator.calculate('10', '%', '3')).toBe(1);
    });

    test('should calculate modulo from image: 5 % 2', () => {
      expect(calculator.calculate('5', '%', '2')).toBe(1);
    });

    test('should calculate power: 2 ^ 8', () => {
      expect(calculator.calculate('2', '^', '8')).toBe(256);
    });

    test('should calculate power from image: 2 ^ 3', () => {
      expect(calculator.calculate('2', '^', '3')).toBe(8);
    });

    test('should calculate square root: √16', () => {
      expect(calculator.calculate('16', '√', '0')).toBe(4);
    });

    test('should calculate square root from image: √16 = 4', () => {
      expect(calculator.calculate('16', '√', '0')).toBe(4);
    });

    test('should handle all extended operations together', () => {
      expect(calculator.calculate('17', '%', '5')).toBe(2);
      expect(calculator.calculate('3', '^', '4')).toBe(81);
      expect(calculator.calculate('25', '√', '0')).toBe(5);
    });

    test('should calculate power with negative result base', () => {
      expect(calculator.calculate('-2', '^', '3')).toBe(-8);
    });

    test('should calculate power of decimal numbers', () => {
      expect(calculator.calculate('1.5', '^', '2')).toBeCloseTo(2.25, 2);
    });

    test('should throw error for modulo by zero', () => {
      expect(() => calculator.calculate('10', '%', '0')).toThrow('Cannot perform modulo with zero divisor');
    });

    test('should throw error for square root of negative in calculate', () => {
      expect(() => calculator.calculate('-9', '√', '0')).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for square root of -1', () => {
      expect(() => calculator.calculate('-1', '√', '0')).toThrow('Cannot calculate square root of a negative number');
    });

    test('should handle string inputs for all extended operations', () => {
      expect(calculator.calculate('20', '%', '6')).toBe(2);
      expect(calculator.calculate('5', '^', '2')).toBe(25);
      expect(calculator.calculate('144', '√', '0')).toBe(12);
    });
  });
});
