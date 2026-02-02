export const statuses = {
  normal: 'text-green-500/80',
  warning: 'text-yellow-500/80',
  critical: 'text-red-500/80',
  info: 'text-orbit-cyan',
} as const;

export type StatusKey = keyof typeof statuses;
export const statusKeys = Object.keys(statuses) as Array<StatusKey>;
