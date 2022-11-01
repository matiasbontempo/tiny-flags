import {
  createContext, useEffect, useMemo, useState,
} from 'react';

import { syncFlags } from './helpers';
import { LOCAL_STORAGE_KEY } from './constants';

import type { ContextProps, Flags, ProviderProps } from './types';

const createFlagsContext = <T extends string>(defaultFlags: Flags<T>) => {
  const FlagsContext = createContext<ContextProps<T>>({
    flags: defaultFlags,
    updateFlag: () => {},
  });

  const FlagsContextProvider = (
    { children }: ProviderProps<T>,
  ) => {
    const [flags, setFlags] = useState<Flags<T>>(syncFlags<T>(defaultFlags));

    const updateFlag = (key: T, value: boolean): void => {
      const flag = flags[key];
      if (!flag) return;

      flag.value = value;
      setFlags({
        ...flags,
        [key]: flag,
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flags));
    };

    useEffect(() => {
      const handleGetFlagsEvent = () => {
        const event = new CustomEvent('TF_FLAGS', { detail: flags });
        document.dispatchEvent(event);
      };

      const handleSetFlagEvent = (e: Event) => {
        const { detail } = e as CustomEvent<{ key: T, value: boolean }>;
        updateFlag(detail.key, detail.value);
      };

      document.addEventListener('TF_GET_FLAGS', handleGetFlagsEvent);
      document.addEventListener('TF_SET_FLAG', handleSetFlagEvent);

      return () => {
        document.removeEventListener('TF_GET_FLAGS', handleGetFlagsEvent);
        document.removeEventListener('TF_SET_FLAG', handleSetFlagEvent);
      };
    }, []);

    const contextValue = useMemo(() => ({
      flags,
      updateFlag,
    }), [flags, updateFlag]);

    return (
      <FlagsContext.Provider value={contextValue}>
        {children}
      </FlagsContext.Provider>
    );
  };

  return { context: FlagsContext, Provider: FlagsContextProvider };
};

export default createFlagsContext;
