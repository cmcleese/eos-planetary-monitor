export const STATUS_STYLE = {
  normal: 'text-green-500/80',
  warning: 'text-yellow-500/80',
  critical: 'text-red-500/80',
  info: 'text-orbit-cyan',
} as const;

export type StatusKey = keyof typeof STATUS_STYLE;

export const STATUS: Record<string, StatusKey> = {
  NORMAL: 'normal',
  WARNING: 'warning',
  CRITICAL: 'critical',
  INFO: 'info',
};
