import { useRef } from "react";

const useDebaounce = () => {
  const DebounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const Debounce = (func: Function, delay: number) => {
    if (DebounceTimeout.current) clearTimeout(DebounceTimeout.current);
    DebounceTimeout.current = setTimeout(() => {
      func();
      DebounceTimeout.current = null;
    }, delay);
  };

  return Debounce;
};

export default useDebaounce;
