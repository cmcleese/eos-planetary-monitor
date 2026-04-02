# Vue -> React Migration Tasks

Use this as the single source of truth for “what’s next”. Tick items off as you port each slice.

## 0) Baseline + parity checklist

- [x] Run `vue-epm` and confirm the current behavior (sidebar, status summary, layers panel, map)
- [x] Run `react-epm` and confirm the current working starting point
- [x] Create a small parity checklist to compare Vue vs React (shell, header, sidebar, status values, layer toggles, map visibility)

## 1) Layout + shell parity

- [x] Ensure `react-epm/src/layouts/MainMonitor.tsx` matches `vue-epm/src/layouts/MainMonitor.vue` structure (sizing, overlay header, main canvas container)
- [x] Temporarily keep map as placeholder until layout matches
- [x] Verify responsive behavior around sidebar breakpoint (mobile drawer vs desktop)

## 2) Navigation migration

- [x] Port `AppHeader.vue` -> `AppHeader.tsx`
- [x] Port `AppSidebar.vue` -> `AppSidebar.tsx` (behavior parity + breakpoints)
- [x] Verify keyboard shortcut + cookie persistence (if supported in your React sidebar)

## 3) Status Summary migration

- [ ] Port `useDashboardData.ts` -> React hook
- [ ] Port `StatTile` -> React component
- [ ] Port `RsgDisplay` -> React component
- [ ] Port `StatusSummary` -> React component
- [ ] Verify the displayed values match Vue output

## 4) Geo Layers migration

- [ ] Port `layers.config.ts` (or React equivalent config)
- [ ] Port `useLayers.ts` / `useLayerManager.ts` (state + side effects)
- [ ] Port `LayerListItem` -> React component
- [ ] Port `LayersList` -> React component
- [ ] Port `LayerController` -> React component
- [ ] Verify toggles update both UI and map state correctly

## 5) Cesium + engine context migration

- [ ] Port `useCesium.ts` -> React hook
- [ ] Replace Vue `provide/inject` with a React Context provider
- [ ] Port `CesiumViewer.vue` -> `CesiumViewer.tsx`
- [ ] Wire provider high enough in the tree (near `MainMonitor`)
- [ ] Verify map initializes correctly and stays mounted once

## 6) End-to-end wiring

- [ ] Replace placeholders in `MainMonitor.tsx` with real `StatusSummary`, `LayersList`, `CesiumViewer`
- [ ] Run the React app and confirm the monitor screen works end-to-end

## 7) Cleanup + stability

- [ ] Remove dead/temporary React scaffolding
- [ ] Run `type-check` + lint
- [ ] Final parity pass: fix spacing, z-index, scroll behavior, and responsive drift
