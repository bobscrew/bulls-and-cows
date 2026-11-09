import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './core';

describe('Sanity check', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('createDigitValidator (stub)', () => {
  it('should throw error until implemented', () => {
    const validator = createDigitValidator(10);
    expect(() => validator('5')).toThrow('Not implemented');
  });
});