import { inject, type InjectionKey } from 'vue';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';

export const planetaryEngineKey: InjectionKey<ReturnType<typeof useCesium>> =
  Symbol('planetaryEngine');

/**
 * Helper to inject the planetary engine with a standard error check.
 * @returns The injected planetary engine instance.
 * @throws Error if the engine is not provided in the component tree.
 */
export function usePlanetaryEngine() {
  const engine = inject(planetaryEngineKey);
  if (!engine) {
    throw new Error('planetaryEngine not provided');
  }
  return engine;
}
