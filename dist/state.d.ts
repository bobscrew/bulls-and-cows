export interface GameSettings {
    length: number;
    base: number;
}
export interface Attempt {
    guess: string;
    bulls: number;
    cows: number;
}
export interface GameState {
    settings: GameSettings;
    secret: string;
    history: Attempt[];
    status: 'settings' | 'playing' | 'won';
    startTime: number;
}
export declare const createInitialState: () => GameState;
export declare const addAttempt: (state: GameState, guess: string, bulls: number, cows: number) => GameState;
