import { useEffect } from 'react';

export const handleClickOutsideEvent = (
  ref: React.RefObject<HTMLElement>,
  callbackFunc: (e: Event) => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        // alert('You clicked outside of me!');
        callbackFunc(event);
        return;
      }
    }

    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
};

export const handleThrottle = (callback: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      callback();
      timer = null;
    }, delay);
  };
};
