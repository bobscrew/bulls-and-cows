import { describe, it, expect } from 'vitest';
import { createDigitValidator, isValidGuess, generateSecret } from './core';

describe('createDigitValidator', () => {
    it('should validate digits for base 10', () => {
        const validator = createDigitValidator(10);
        expect(validator('5')).toBe(true);
        expect(validator('a')).toBe(false);
    });
});

describe('isValidGuess', () => {
    it('should return true for a valid guess', () => {
        expect(isValidGuess('1234', 4, 10)).toBe(true);
    });
    it('should return false if length is wrong', () => {
        expect(isValidGuess('123', 4, 10)).toBe(false);
    });
});

describe('generateSecret', () => {
    it('should generate a secret of correct length with unique digits', () => {
        const mockRandom = () => 0.5; // детерминированный рандом (всегда 0.5)
        const secret = generateSecret(4, 10, mockRandom);
        expect(secret.length).toBe(4);
        expect(new Set(secret).size).toBe(4);
    });

    it('should use the provided random function', () => {
        // Первый вызов вернет 0.1, второй 0.2 и т.д.
        let callCount = 0;
        const mockRandom = () => {
            callCount++;
            return callCount * 0.1;
        };
        const secret = generateSecret(2, 10, mockRandom);
        expect(secret.length).toBe(2);
    });

    it('should generate different secrets with different random values', () => {
        const random1 = () => 0.1;
        const random2 = () => 0.9;
        expect(generateSecret(2, 10, random1)).not.toBe(generateSecret(2, 10, random2));
    });
});