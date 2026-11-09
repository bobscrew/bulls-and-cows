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

export const createInitialState = (): GameState => ({
    settings: { length: 4, base: 10 },
    secret: '',
    history: [],
    status: 'settings',
    startTime: 0,
});

export const addAttempt = (
    state: GameState,
    guess: string,
    bulls: number,
    cows: number
): GameState => ({
    ...state,
    history: [...state.history, { guess, bulls, cows }],
    status: bulls === state.settings.length ? 'won' : 'playing',
});