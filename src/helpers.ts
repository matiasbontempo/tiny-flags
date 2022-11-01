import { LOCAL_STORAGE_KEY } from './constants';
import { Flags } from './types';

export const syncFlags = <T extends string>(defaultFlags: Flags<T>): Flags<T> => {
  const rawFlags = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!rawFlags) return defaultFlags;

  const flagsToReturn = { ...defaultFlags };

  try {
    const savedFlags = JSON.parse(rawFlags) as Flags<T>;
    const keys = Object.keys(savedFlags) as T[];
    keys.forEach((key) => {
      if (!flagsToReturn[key]) return;
      if (!savedFlags[key]) return;
      flagsToReturn[key].value = savedFlags[key].value;
    });

    return flagsToReturn;
  } catch (err) {
    return defaultFlags;
  }
};
