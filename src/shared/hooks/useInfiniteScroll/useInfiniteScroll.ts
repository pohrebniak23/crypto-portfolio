import { MutableRefObject, RefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  wrapperRef: RefObject<HTMLDivElement>;
  triggerRef: MutableRefObject<HTMLDivElement>;
  callback?: () => void;
}

export const useInfiniteScroll = ({
  wrapperRef,
  triggerRef,
  callback,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
  
      observer.observe(triggerRef.current);
    }

    return () => {
      if (observer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current);
      }
    };
  }, [triggerRef, wrapperRef, callback]);
};
