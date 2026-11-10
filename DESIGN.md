# Design Document: Bulls and Cows

## 1. Data Structures and Algorithms

### Game State
The game state is represented by the `GameState` interface (`src/state.ts`):
- `settings`: An object containing `length` (number of digits) and `base` (number system).
- `secret`: A string representing the secret number (e.g., "0123").
- `history`: An array of `Attempt` objects. Each attempt stores the guessed string and the resulting bulls/cows.
- `status`: A union type (`'settings' | 'playing' | 'won'`) to track the current screen.
- `startTime`: A timestamp used to calculate the elapsed time.

**Why immutable?** 
The history is updated using the spread operator (`[...state.history, newAttempt]`) rather than `push()`. This ensures that state updates are predictable and pure, avoiding side effects and making the game easier to debug and test.

### Algorithm: `evaluateGuess`
The algorithm compares two strings (secret and guess) and counts bulls and cows.
1. Both strings are converted to lowercase arrays to handle hex digits (e.g., 'A' and 'a' are treated the same).
2. **Bulls** are calculated using `reduce`: we iterate over the guess array and count how many characters match the secret character at the exact same index.
3. **Cows** are calculated by filtering the guess characters that exist anywhere in the secret array. The total number of matches minus the bulls gives the cows.
This approach uses higher-order functions (HOF) and avoids manual `for` loops.

### Algorithm: `countPossibleSecrets`
This function calculates the number of permutations without repetition: \(P(base, length) = \frac{base!}{(base - length)!}\).
- **Recursion**: The function is defined recursively as `base * countPossibleSecrets(length - 1, base - 1)`.
- **Base cases**: If `length === 0`, return 1. If `length > base`, return 0.
- **Memoization**: A `memo` object is used to cache results based on the `length-base` key. This prevents recalculating the same permutations when the settings screen is opened multiple times.

## 2. Complexity (Big O)

- **`generateSecret(length, base)`**: **O(length)**. The function recursively picks unique characters. In the worst case, it iterates `length` times, and array slicing takes O(base) time per step, but since `length` is small (max 6), it's practically constant.
- **`evaluateGuess(secret, guess)`**: **O(n)**. The `reduce` and `filter` methods iterate over the guess array once. `includes` inside `filter` adds a potential O(n) in the worst case, making it O(n²), but since `n` is small (max 6), it's negligible.
- **`isValidGuess(guess, length, base)`**: **O(n)**. Converting to a Set and checking length takes O(n) time.
- **`countPossibleSecrets(length, base)`**: **O(length)**. With memoization, the first call takes O(length) due to recursion. Subsequent calls are **O(1)** since they are retrieved from the cache.

## 3. Clean Code Principles

- **Pure Functions**: The entire `src/core.ts` file consists of pure functions. They do not mutate external state, do not rely on DOM, and return the same output for the same input.
- **Higher-Order Functions (HOF)**: Used extensively in `evaluateGuess` (`reduce`, `filter`) and `createDigitValidator` (returns a function).
- **Currying**: `createDigitValidator(base)` returns a function `(char) => boolean`. This allows creating specific validators once and reusing them for input filtering and validation.
- **Immutability**: State updates in `src/state.ts` always return a new object with the spread operator, never modifying the original.