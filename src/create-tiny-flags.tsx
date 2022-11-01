import { useContext } from 'react';

import createFlagsContext from './create-flags-context';

import type { Flag, FlagsDictionary } from './types';

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

    return flagsDictionary;
  };

  return { FlagsProvider: Provider, useFlags };
};

export default createTinyFlags;
