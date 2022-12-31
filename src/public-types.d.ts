import type { FC, ReactNode } from 'react';

export type Flag = {
  label: string;
  value?: boolean;
};

type Flags<T extends string> = Record<T, Flag>;

export const createTinyFlags: <T extends string>(flags: Flags<T>) => {
  FlagsProvider: FC<{
    children: ReactNode;
  }>,
  useFlags: () => Record<T, boolean>,
  FlagsWrapper: FC<{
    condition: T | T[] | ((flags: Record<T, boolean>) => boolean);
    children: ReactNode;
  }>
};
