import { inject, type InjectionKey } from 'vue';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';

export const planetaryEngineKey: InjectionKey<ReturnType<typeof useCesium>> = Symbol('planetaryEngine');

/**
 * Helper to inject the planetary engine with a standard error check.
 * @param componentName The name of the component calling this, for the error message.
 * @returns The injected planetary engine instance.
 * @throws Error if the engine is not provided in the component tree.
 */
export function usePlanetaryEngine(componentName: string) {
  const engine = inject(planetaryEngineKey);
  if (!engine) {
    throw new Error(`${componentName}: planetaryEngine not provided`);
  }
  return engine;
}
