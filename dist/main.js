import {
  createDigitValidator,
  generateSecret,
  evaluateGuess,
  isValidGuess,
  countPossibleSecrets,
} from "./core.js";
import { createInitialState, addAttempt } from "./state.js";
const app = document.getElementById("app");
if (!app) throw new Error("App container not found");
let state = createInitialState();
const getRecords = () => {
  const records = localStorage.getItem("bulls_records");
  return records ? JSON.parse(records) : [];
};
const saveRecord = (record) => {
  const records = getRecords();
  records.push(record);
  records.sort((a, b) => {
    const aAttempts = parseInt(a.split(": ")[1]);
    const bAttempts = parseInt(b.split(": ")[1]);
    return aAttempts - bAttempts;
  });
  localStorage.setItem("bulls_records", JSON.stringify(records.slice(0, 5)));
};
const renderRecords = () => {
  const records = getRecords();
  if (records.length === 0) return;
  const container = document.createElement("div");
  container.className = "records";
  const title = document.createElement("h2");
  title.textContent = "🏆 Top Records";
  const list = document.createElement("ul");
  records.forEach((record, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${record}`;
    list.append(li);
  });
  container.append(title, list);
  app.append(container);
};
const renderSettings = () => {
  app.innerHTML = "";
  const container = document.createElement("div");
  container.className = "settings";
  const title = document.createElement("h1");
  title.textContent = "Bulls and Cows";
  const baseSelect = document.createElement("select");
  const bases = [
    { label: "Binary (2)", value: 2 },
    { label: "Octal (8)", value: 8 },
    { label: "Decimal (10)", value: 10 },
    { label: "Hex (16)", value: 16 },
  ];
  bases.forEach((b) => {
    const option = document.createElement("option");
    option.value = b.value.toString();
    option.textContent = b.label;
    baseSelect.append(option);
  });
  baseSelect.value = "10";
  const lengthSelect = document.createElement("select");
  const updateLengthOptions = () => {
    const base = parseInt(baseSelect.value, 10);
    lengthSelect.innerHTML = "";
    const maxLen = base === 2 ? 2 : 6;
    for (let i = 2; i <= maxLen; i++) {
      const option = document.createElement("option");
      option.value = i.toString();
      option.textContent = i.toString();
      lengthSelect.append(option);
    }
  };
  baseSelect.addEventListener("change", updateLengthOptions);
  updateLengthOptions();
  const possibleInfo = document.createElement("p");
  const updatePossibleInfo = () => {
    const base = parseInt(baseSelect.value, 10);
    const length = parseInt(lengthSelect.value, 10);
    possibleInfo.textContent = `Possible combinations: ${countPossibleSecrets(length, base)}`;
  };
  lengthSelect.addEventListener("change", updatePossibleInfo);
  updatePossibleInfo();
  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Game";
  startBtn.addEventListener("click", () => {
    const base = parseInt(baseSelect.value, 10);
    const length = parseInt(lengthSelect.value, 10);
    const secret = generateSecret(length, base);
    state = {
      ...state,
      settings: { length, base },
      secret,
      history: [],
      status: "playing",
      startTime: Date.now(),
    };
    renderGame();
  });
  container.append(title, possibleInfo, baseSelect, lengthSelect, startBtn);
  app.append(container);
  renderRecords();
};
const renderGame = () => {
  app.innerHTML = "";
  const container = document.createElement("div");
  container.className = "game";
  const info = document.createElement("p");
  info.textContent = `Base: ${state.settings.base}, Length: ${state.settings.length}`;
  const input = document.createElement("input");
  input.placeholder = `Enter ${state.settings.length} digits`;
  input.maxLength = state.settings.length;
  const validator = createDigitValidator(state.settings.base);
  input.addEventListener("input", (e) => {
    const target = e.target;
    const value = target.value;
    const filtered = value.split("").filter(validator).join("");
    if (target.value !== filtered) target.value = filtered;
  });
  const guessBtn = document.createElement("button");
  guessBtn.textContent = "Guess";
  guessBtn.addEventListener("click", () => {
    const guess = input.value;
    if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
      alert("Invalid guess!");
      return;
    }
    const { bulls, cows } = evaluateGuess(state.secret, guess);
    state = addAttempt(state, guess, bulls, cows);
    if (state.status === "won") {
      const time = (Date.now() - state.startTime) / 1000;
      alert(
        `You won! Attempts: ${state.history.length}, Time: ${time.toFixed(2)}s`,
      );
      const record = `${state.settings.base}-${state.settings.length}: ${state.history.length} attempts, ${time.toFixed(2)}s`;
      saveRecord(record);
      renderSettings();
    } else {
      renderHistory(container);
    }
  });
  const newGameBtn = document.createElement("button");
  newGameBtn.textContent = "New Game";
  newGameBtn.addEventListener("click", () => {
    state = createInitialState();
    renderSettings();
  });
  container.append(info, input, guessBtn, newGameBtn);
  renderHistory(container);
  app.append(container);
};
const renderHistory = (container) => {
  const oldHistory = container.querySelector(".history");
  if (oldHistory) oldHistory.remove();
  const historyList = document.createElement("ul");
  historyList.className = "history";
  state.history.forEach((attempt) => {
    const li = document.createElement("li");
    li.textContent = `${attempt.guess}: ${attempt.bulls} Bulls, ${attempt.cows} Cows`;
    historyList.append(li);
  });
  container.append(historyList);
};
renderSettings();
//# sourceMappingURL=main.js.map
