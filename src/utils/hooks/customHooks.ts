import { useCallback, useEffect, useRef, useState } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export const useStateCallback = <T>(
  initailState: T
): [T, (state: T, cb?: (state: T) => void) => void] => {
  const [state, setState] = useState(initailState);
  const cbRef = useRef<((state: T) => void) | undefined>(undefined); // init mutable ref container for callbacks
  const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `undefined` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};
type CallbackFunction = () => void;

export const useInterval = (callback: CallbackFunction, delay: number) => {
  const savedCallback = useRef<CallbackFunction>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
