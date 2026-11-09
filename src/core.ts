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