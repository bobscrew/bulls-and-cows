import { createDigitValidator, generateSecret, evaluateGuess, isValidGuess } from './core.js';
import { createInitialState, addAttempt } from './state.js';
const app = document.getElementById('app');
if (!app)
    throw new Error('App container not found');
let state = createInitialState();
const renderSettings = () => {
    app.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'settings';
    const title = document.createElement('h1');
    title.textContent = 'Bulls and Cows';
    const baseSelect = document.createElement('select');
    const bases = [
        { label: 'Binary (2)', value: 2 },
        { label: 'Octal (8)', value: 8 },
        { label: 'Decimal (10)', value: 10 },
        { label: 'Hex (16)', value: 16 }
    ];
    bases.forEach(b => {
        const option = document.createElement('option');
        option.value = b.value.toString();
        option.textContent = b.label;
        baseSelect.append(option);
    });
    baseSelect.value = '10';
    const lengthSelect = document.createElement('select');
    const updateLengthOptions = () => {
        const base = parseInt(baseSelect.value, 10);
        lengthSelect.innerHTML = ''; // очистка
        const maxLen = base === 2 ? 2 : 6;
        for (let i = 2; i <= maxLen; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i.toString();
            lengthSelect.append(option);
        }
    };
    baseSelect.addEventListener('change', updateLengthOptions);
    updateLengthOptions();
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Game';
    startBtn.addEventListener('click', () => {
        const base = parseInt(baseSelect.value, 10);
        const length = parseInt(lengthSelect.value, 10);
        const secret = generateSecret(length, base);
        state = {
            ...state,
            settings: { length, base },
            secret,
            history: [],
            status: 'playing',
            startTime: Date.now(),
        };
        renderGame();
    });
    container.append(title, baseSelect, lengthSelect, startBtn);
    app.append(container);
};
const renderGame = () => {
    app.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'game';
    const info = document.createElement('p');
    info.textContent = `Base: ${state.settings.base}, Length: ${state.settings.length}`;
    const input = document.createElement('input');
    input.placeholder = `Enter ${state.settings.length} digits`;
    input.maxLength = state.settings.length;
    const validator = createDigitValidator(state.settings.base);
    input.addEventListener('input', (e) => {
        const target = e.target;
        const value = target.value;
        const filtered = value.split('').filter(validator).join('');
        if (target.value !== filtered)
            target.value = filtered;
    });
    const guessBtn = document.createElement('button');
    guessBtn.textContent = 'Guess';
    guessBtn.addEventListener('click', () => {
        const guess = input.value;
        if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
            alert('Invalid guess!');
            return;
        }
        const { bulls, cows } = evaluateGuess(state.secret, guess);
        state = addAttempt(state, guess, bulls, cows);
        if (state.status === 'won') {
            const time = (Date.now() - state.startTime) / 1000;
            alert(`You won! Attempts: ${state.history.length}, Time: ${time}s`);
            const record = `${state.settings.base}-${state.settings.length}: ${state.history.length} attempts, ${time.toFixed(2)}s`;
            const records = JSON.parse(localStorage.getItem('bulls_records') || '[]');
            records.push(record);
            localStorage.setItem('bulls_records', JSON.stringify(records));
            renderSettings();
        }
        else {
            renderHistory(container);
        }
    });
    container.append(info, input, guessBtn);
    renderHistory(container);
    app.append(container);
};
const renderHistory = (container) => {
    const oldHistory = container.querySelector('.history');
    if (oldHistory)
        oldHistory.remove();
    const historyList = document.createElement('ul');
    historyList.className = 'history';
    state.history.forEach(attempt => {
        const li = document.createElement('li');
        li.textContent = `${attempt.guess}: ${attempt.bulls} Bulls, ${attempt.cows} Cows`;
        historyList.append(li);
    });
    container.append(historyList);
};
renderSettings();
//# sourceMappingURL=main.js.map