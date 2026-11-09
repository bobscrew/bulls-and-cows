export const createDigitValidator = (base: number) => (char: string): boolean => {
    if (char.length !== 1) return false;
    const digit = char.toLowerCase();
    if (base <= 10) {
        const num = parseInt(digit, 10);
        return !isNaN(num) && num < base;
    } else if (base === 16) {
        return /^[0-9a-f]$/.test(digit);
    }
    return false;
};

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
    if (guess.length !== length) return false;
    const validator = createDigitValidator(base);
    const chars = guess.toLowerCase().split('');
    
    if (!chars.every(validator)) return false;

    return new Set(chars).size === chars.length;
};