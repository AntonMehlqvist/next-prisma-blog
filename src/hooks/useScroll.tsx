import { useState, useEffect } from 'react';

export function useScroll() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState<DOMRect>();
  const [scrollY, setScrollY] = useState(bodyOffset?.top);
  const [scrollX, setScrollX] = useState(bodyOffset?.left);
  const [scrollDirection, setScrollDirection] = useState('down');

  const listener = () => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(bodyOffset ? -bodyOffset?.top : 0);
    setScrollX(bodyOffset?.left);
    setScrollDirection(
      bodyOffset && lastScrollTop > -bodyOffset?.top ? 'down' : 'up'
    );
    setLastScrollTop(bodyOffset ? -bodyOffset?.top : 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
}
