import { describe, it, expect } from 'vitest';
import { createDigitValidator, isValidGuess } from './core';

describe('createDigitValidator', () => {
    it('should validate digits for base 10', () => {
        const validator = createDigitValidator(10);
        expect(validator('5')).toBe(true);
        expect(validator('9')).toBe(true);
        expect(validator('a')).toBe(false);
    });

    it('should validate hex digits case-insensitively', () => {
        const validator = createDigitValidator(16);
        expect(validator('A')).toBe(true);
        expect(validator('f')).toBe(true);
        expect(validator('g')).toBe(false);
    });
});

describe('isValidGuess', () => {
    it('should return true for a valid guess', () => {
        expect(isValidGuess('1234', 4, 10)).toBe(true);
    });

    it('should return false if length is wrong', () => {
        expect(isValidGuess('123', 4, 10)).toBe(false);
        expect(isValidGuess('12345', 4, 10)).toBe(false);
    });

    it('should return false if there are duplicates', () => {
        expect(isValidGuess('1123', 4, 10)).toBe(false);
    });

    it('should return false for invalid characters in base', () => {
        expect(isValidGuess('12a4', 4, 10)).toBe(false);
        expect(isValidGuess('12g4', 4, 16)).toBe(false);
    });

    it('should return true for hex guess with uppercase', () => {
        expect(isValidGuess('A1B2', 4, 16)).toBe(true);
    });
});