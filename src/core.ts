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

export const generateSecret = (
    length: number,
    base: number,
    random: () => number = Math.random
): string => {
    const digits = '0123456789abcdef'.slice(0, base).split('');
    
    const pickUnique = (available: string[], count: number): string[] => {
        if (count === 0) return [];
        const index = Math.floor(random() * available.length);
        const picked = available[index];
        const rest = [...available.slice(0, index), ...available.slice(index + 1)];
        return [picked, ...pickUnique(rest, count - 1)];
    };

    return pickUnique(digits, length).join('');
};