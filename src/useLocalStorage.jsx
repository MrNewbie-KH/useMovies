import { useState, useEffect } from "react";
export function useLocalStorage(initState, itemName) {
  const [val, setVal] = useState(() => {
    return JSON.parse(localStorage.getItem(itemName));
  });
  useEffect(() => {
    localStorage.setItem(itemName, JSON.stringify(val));
  }, [val, itemName]);
  return [val, setVal];
}
