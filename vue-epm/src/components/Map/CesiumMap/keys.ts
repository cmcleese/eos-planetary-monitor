import type { InjectionKey } from 'vue';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';

export const planetaryEngineKey: InjectionKey<ReturnType<typeof useCesium>> = Symbol('planetaryEngine');
