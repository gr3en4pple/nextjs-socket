import { useState } from 'react';

export const useString = (defaultValue = '') => {
  const [value, setValue] = useState<string>(defaultValue);

  return { value, setValue };
};

export const useNumber = (defaultValue = 0) => {
  const [value, setValue] = useState<number>(defaultValue);

  return { value, setValue };
};

export const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState<boolean>(defaultValue);
  return { value, setValue };
};
