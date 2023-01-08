import { useEffect, useState } from "react";
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue == null) {
      if (typeof defaultValue === "function") {
        return defaultValue();
      } else {
        return defaultValue;
      }
    } else {
      const localStorageValue = JSON.parse(jsonValue);

      return localStorageValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
