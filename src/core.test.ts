import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './core';

describe('createDigitValidator', () => {
    it('should validate digits for base 10', () => {
        const validator = createDigitValidator(10);
        expect(validator('5')).toBe(true);
        expect(validator('9')).toBe(true);
        expect(validator('a')).toBe(false);
        expect(validator('10')).toBe(false);
    });

    it('should validate hex digits case-insensitively', () => {
        const validator = createDigitValidator(16);
        expect(validator('A')).toBe(true);
        expect(validator('f')).toBe(true);
        expect(validator('9')).toBe(true);
        expect(validator('g')).toBe(false);
    });

    it('should validate binary digits', () => {
        const validator = createDigitValidator(2);
        expect(validator('0')).toBe(true);
        expect(validator('1')).toBe(true);
        expect(validator('2')).toBe(false);
    });
});