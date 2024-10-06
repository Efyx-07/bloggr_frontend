'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export default function TopScroller() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isWindowScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      setIsScrollable(isWindowScrollable);
      setIsVisible(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {isVisible && isScrollable && (
        <div
          onClick={scrollToTop}
          className="
                absolute right-0 w-10 h-10
                bg-accent rounded-full
                flex justify-center items-center
                text-whiteRelief
                cursor-pointer
            "
        >
          <Icon icon="ep:arrow-up-bold" />
        </div>
      )}
    </>
  );
}
