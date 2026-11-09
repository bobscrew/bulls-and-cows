export declare const createDigitValidator: (base: number) => (char: string) => boolean;
export declare const isValidGuess: (guess: string, length: number, base: number) => boolean;
export declare const generateSecret: (length: number, base: number, random?: () => number) => string;
export declare const evaluateGuess: (secret: string, guess: string) => {
    bulls: number;
    cows: number;
};
export declare const countPossibleSecrets: (length: number, base: number) => number;
