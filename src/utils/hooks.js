import { useEffect } from 'react';

export function useScroll(containerRef, targetsRefs, callback) {
  useEffect(() => {
    const container = containerRef.current;
    const targets = Object.values(targetsRefs.current);

    const options = {
      root: container,
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    }, options);

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, [containerRef, targetsRefs, callback]);
}