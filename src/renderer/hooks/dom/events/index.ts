import { useEffect } from 'react';

export default function useEventListener<
  T extends HTMLElement,
  K extends keyof HTMLElementEventMap
>(
  element: T | Document | Window | null,
  event: K,
  listener: (ev: HTMLElementEventMap[K]) => any
) {
  useEffect(() => {
    element?.addEventListener(event, listener as any);

    return () => element?.removeEventListener(event, listener as any);
  }, [event, listener, element]);
}
