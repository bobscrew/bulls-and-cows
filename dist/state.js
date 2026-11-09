export const createInitialState = () => ({
    settings: { length: 4, base: 10 },
    secret: '',
    history: [],
    status: 'settings',
    startTime: 0,
});
export const addAttempt = (state, guess, bulls, cows) => ({
    ...state,
    history: [...state.history, { guess, bulls, cows }],
    status: bulls === state.settings.length ? 'won' : 'playing',
});
//# sourceMappingURL=state.js.map