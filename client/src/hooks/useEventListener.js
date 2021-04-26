import { useEffect, useRef } from 'react';

export default function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();// Create a ref that stores handler
  // Update ref.current value if handler changes.
  // always get latest handler without passing it in effect deps array (and potentially causing the effect to run every render).
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => { // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = event => savedHandler.current(event); // Create event listener that calls handler function stored in ref
      element.addEventListener(eventName, eventListener); // Add event listener    
      return () => {
        element.removeEventListener(eventName, eventListener); // Remove event listener on cleanup
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}