# Vue (vue-epm) -> React (react-epm) Migration Plan

Goal: migrate features from the working Vue implementation into the React app while preserving behavior and keeping parity with the Vue UI.

Approach:

- Slice migration by user-visible features (layout, navigation, status, layers, map)
- After each slice, verify behavior against the Vue baseline
- Prefer React hooks + context for shared state (replace Vue `provide/inject`)

Notes:

- Keep the existing React starting point intact as the “known good shell”
- Minimize risky config refactors; fix editor/tooling issues without breaking VSCode/Antigravity
