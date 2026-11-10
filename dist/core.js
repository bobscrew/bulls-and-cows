export const createDigitValidator = (base) => (char) => {
    if (char.length !== 1)
        return false;
    const digit = char.toLowerCase();
    if (base <= 10) {
        const num = parseInt(digit, 10);
        return !isNaN(num) && num < base;
    }
    else if (base === 16) {
        return /^[0-9a-f]$/.test(digit);
    }
    return false;
};
export const isValidGuess = (guess, length, base) => {
    if (guess.length !== length)
        return false;
    const validator = createDigitValidator(base);
    const chars = guess.toLowerCase().split('');
    if (!chars.every(validator))
        return false;
    return new Set(chars).size === chars.length;
};
export const generateSecret = (length, base, random = Math.random) => {
    const digits = '0123456789abcdef'.slice(0, base).split('');
    const pickUnique = (available, count) => {
        if (count === 0)
            return [];
        const index = Math.floor(random() * available.length);
        const picked = available[index];
        const rest = [...available.slice(0, index), ...available.slice(index + 1)];
        return [picked, ...pickUnique(rest, count - 1)];
    };
    return pickUnique(digits, length).join('');
};
export const evaluateGuess = (secret, guess) => {
    const secretChars = secret.toLowerCase().split('');
    const guessChars = guess.toLowerCase().split('');
    const bulls = guessChars.reduce((acc, char, i) => {
        return acc + (char === secretChars[i] ? 1 : 0);
    }, 0);
    const common = guessChars.filter((char) => secretChars.includes(char)).length;
    const cows = common - bulls;
    return { bulls, cows };
};
const memo = {};
export const countPossibleSecrets = (length, base) => {
    const key = `${length}-${base}`;
    if (memo[key] !== undefined)
        return memo[key];
    if (length === 0)
        return 1;
    if (length > base)
        return 0;
    const result = base * countPossibleSecrets(length - 1, base - 1);
    memo[key] = result;
    return result;
};
//# sourceMappingURL=core.js.map