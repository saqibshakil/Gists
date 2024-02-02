import { Connect, connect } from 'react-redux';

export function applyConnectDefaults(defaults: Parameters<typeof connect>[3]): Connect  {
  return (...args: any) =>
    connect(
      args[0],
      args.length >= 1 ? args[1] : undefined,
      args.length >= 2 ? args[2] : undefined,
      {
        ...defaults,
        ...(args.length >= 3 ? args[3] : {}),
      }
    ) as any
}
