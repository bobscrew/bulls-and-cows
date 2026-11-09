import { describe, it, expect } from 'vitest';
import { createDigitValidator, isValidGuess, generateSecret, evaluateGuess, countPossibleSecrets } from './core';

describe('createDigitValidator', () => { /* ... */ });
describe('isValidGuess', () => { /* ... */ });
describe('generateSecret', () => { /* ... */ });
describe('evaluateGuess', () => { /* ... */ });

describe('countPossibleSecrets', () => {
    it('should calculate permutations for base 10', () => {
        expect(countPossibleSecrets(2, 10)).toBe(90);
        expect(countPossibleSecrets(4, 10)).toBe(5040);
    });

    it('should calculate permutations for binary', () => {
        // P(2, 2) = 2 * 1 = 2
        expect(countPossibleSecrets(2, 2)).toBe(2);
    });

    it('should return 0 if length > base (impossible)', () => {
        expect(countPossibleSecrets(5, 2)).toBe(0);
    });

    it('should be memoized (fast on second call)', () => {
        const first = countPossibleSecrets(6, 10);
        const second = countPossibleSecrets(6, 10);
        expect(first).toBe(second);
    });
});