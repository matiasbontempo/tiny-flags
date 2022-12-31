import type { ReactNode } from 'react';

export type Flag = {
  label: string;
  value?: boolean;
};

export type Flags<T extends string> = Record<T, Flag>;

export type FlagsDictionary<T extends string> = Record<T, boolean>;

export type ContextProps<T extends string> = {
  flags: Flags<T>;
  updateFlag: (key: T, value: boolean) => void;
};

export type ProviderProps<T extends string> = {
  flags: Flags<T>;
  children: ReactNode;
};

export type WrapperProps<T extends string> = {
  condition: T | T[] | ((flags: FlagsDictionary<T>) => boolean);
  children: ReactNode;
};
