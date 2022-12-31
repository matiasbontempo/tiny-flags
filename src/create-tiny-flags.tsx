import { useContext } from 'react';

import createFlagsContext from './create-flags-context';

import type { Flag, FlagsDictionary, WrapperProps } from './types';

let initialized = false;

const createTinyFlags = <T extends string>(defaultFlags: Record<T, Flag>) => {
  if (initialized) throw new Error('Tiny Flags already initialized');
  initialized = true;

  const { context, Provider } = createFlagsContext(defaultFlags);

  const useFlags = () => {
    const { flags } = useContext(context);
    const flagsDictionary: Partial<FlagsDictionary<T>> = {};
    const flagsKeys = Object.keys(flags) as T[];

    flagsKeys.forEach((key) => { flagsDictionary[key] = flags[key].value || false; });

    return flagsDictionary as FlagsDictionary<T>;
  };

  const FlagsWrapper = ({ children, condition }: WrapperProps<T>) => {
    const tinyFlags = useFlags();

    let isActive = false;

    if (typeof condition === 'string') isActive = !!tinyFlags[condition];
    else if (Array.isArray(condition)) isActive = condition.every((flag) => !!tinyFlags[flag]);
    else if (typeof condition === 'function') isActive = condition(tinyFlags);

    if (!isActive) return null;
    return children;
  };

  return { FlagsProvider: Provider, useFlags, FlagsWrapper };
};

export default createTinyFlags;
