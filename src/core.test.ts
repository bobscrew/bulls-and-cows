import { describe, it, expect } from 'vitest';
import { createDigitValidator, isValidGuess, generateSecret, evaluateGuess, countPossibleSecrets } from './core';

describe('createDigitValidator', () => {
    it('should validate digits for base 10', () => {
        const validator = createDigitValidator(10);
        expect(validator('5')).toBe(true);
        expect(validator('a')).toBe(false);
    });
    it('should validate hex digits case-insensitively', () => {
        const validator = createDigitValidator(16);
        expect(validator('A')).toBe(true);
        expect(validator('g')).toBe(false);
    });
});

describe('isValidGuess', () => {
    it('should return true for a valid guess', () => {
        expect(isValidGuess('1234', 4, 10)).toBe(true);
    });
    it('should return false if length is wrong', () => {
        expect(isValidGuess('123', 4, 10)).toBe(false);
    });
    it('should return false if there are duplicates', () => {
        expect(isValidGuess('1123', 4, 10)).toBe(false);
    });
});

describe('generateSecret', () => {
    it('should generate a secret of correct length with unique digits', () => {
        const secret = generateSecret(4, 10, () => 0.5);
        expect(secret.length).toBe(4);
        expect(new Set(secret).size).toBe(4);
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
});

describe('countPossibleSecrets', () => {
    it('should calculate permutations for base 10', () => {
        expect(countPossibleSecrets(2, 10)).toBe(90);
        expect(countPossibleSecrets(4, 10)).toBe(5040);
    });
    it('should return 0 if length > base', () => {
        expect(countPossibleSecrets(5, 2)).toBe(0);
    });
});