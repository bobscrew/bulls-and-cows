import { describe, it, expect } from 'vitest';
import { createDigitValidator, isValidGuess, generateSecret, evaluateGuess } from './core';

describe('createDigitValidator', () => {
    it('should validate digits', () => {
        expect(createDigitValidator(10)('5')).toBe(true);
    });
});

describe('isValidGuess', () => {
    it('should validate guess', () => {
        expect(isValidGuess('1234', 4, 10)).toBe(true);
    });
});

describe('generateSecret', () => {
    it('should generate secret', () => {
        const secret = generateSecret(4, 10, () => 0.5);
        expect(secret.length).toBe(4);
    });
});

describe('evaluateGuess', () => {
    it('should return all bulls if guess equals secret', () => {
        expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
    });

    it('should return all cows if digits are in wrong positions', () => {
        expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
    });

    it('should return mixed bulls and cows', () => {
        expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
    });

    it('should handle hex case-insensitively', () => {
        expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
    });

    it('should return zero if no matches', () => {
        expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
    });
});