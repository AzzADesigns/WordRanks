import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange,
} = {}) {
  const [ref, setRef] = useState(null); // Referencia al elemento
  const [state, setState] = useState({
    isIntersecting: initialIsIntersecting,
    entry: undefined,
  });

  const callbackRef = useRef();

  // Actualiza la referencia del callback
  callbackRef.current = onChange;

  const frozen = state.entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    if (!ref) return; // Asegura que hay un ref asignado
    if (!('IntersectionObserver' in window)) return; // Verifica soporte del navegador
    if (frozen) return; // Detiene el observer si está congelado

    let unobserve;

    const observer = new IntersectionObserver(
      (entries) => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds];

        entries.forEach((entry) => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some((threshold) => entry.intersectionRatio >= threshold);

          setState({ isIntersecting, entry });

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, JSON.stringify(threshold), root, rootMargin, frozen, freezeOnceVisible]);

  return { ref: setRef, ...state };
}
