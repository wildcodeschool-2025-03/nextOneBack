import { useCallback, useRef } from "react";

export function useCarouselNavigation(dataLength: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef<number>(2);
  const isTransitioningRef = useRef<boolean>(false);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const firstCard = track.querySelector(
      ".mini-game-carousel-card, .arcade-carousel-card",
    ) as HTMLElement;

    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = Number.parseFloat(getComputedStyle(track).gap || "0");
      const translateX = -(cardWidth + gap) * index;

      if (!smooth) {
        track.style.transition = "none";
        track.offsetHeight;
      } else {
        track.style.transition = "transform 0.3s ease";
      }

      track.style.transform = `translateX(${translateX}px)`;
      currentIndexRef.current = index;
    }
  }, []);

  // Scroll gauche

  const scrollLeft = useCallback(() => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const newIndex = currentIndexRef.current - 1;

    console.log("scroll gauche :", newIndex);
    scrollToIndex(newIndex, true);

    if (newIndex === 1) {
      setTimeout(() => {
        scrollToIndex(dataLength + 1, false);
        requestAnimationFrame(() => {
          isTransitioningRef.current = false;
        });
      }, 300);
    } else {
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 300);
    }
  }, [dataLength, scrollToIndex]);

  // Scroll droite

  const scrollRight = useCallback(() => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const newIndex = currentIndexRef.current + 1;

    console.log("scroll droit :", newIndex);

    if (newIndex === dataLength + 2) {
      scrollToIndex(newIndex, true);
      setTimeout(() => {
        scrollToIndex(2, false);
        requestAnimationFrame(() => {
          isTransitioningRef.current = false;
        });
      }, 300);
    } else {
      scrollToIndex(newIndex, true);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 300);
    }
  }, [dataLength, scrollToIndex]);

  const initializeCarousel = useCallback(() => {
    if (!trackRef.current) return;

    scrollToIndex(2, false);

    requestAnimationFrame(() => {
      isTransitioningRef.current = false;
    });
  }, [scrollToIndex]);

  const setCurrentIndexRef = (index: number) => {
    currentIndexRef.current = index;
  };

  return {
    trackRef,
    scrollToIndex,
    scrollLeft,
    scrollRight,
    currentIndexRef,
    setCurrentIndexRef,
    initializeCarousel,
  };
}
