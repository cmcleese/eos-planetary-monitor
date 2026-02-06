import type { ComputedRef, Ref } from 'vue';
import { createContext } from 'reka-ui';

export const SIDEBAR_CONFIG = {
  COOKIE_NAME: 'sidebar_state',
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7,
  WIDTH: '30rem',
  WIDTH_MOBILE: '24rem',
  WIDTH_ICON: '3rem',
  KEYBOARD_SHORTCUT: 'b',
  BREAKPOINT: 1200, // Drawer breakpoint in pixels
} as const;

export const [useSidebar, provideSidebarContext] = createContext<{
  state: ComputedRef<'expanded' | 'collapsed'>;
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  isMobile: Ref<boolean>;
  openMobile: Ref<boolean>;
  setOpenMobile: (value: boolean) => void;
  toggleSidebar: () => void;
}>('Sidebar');
