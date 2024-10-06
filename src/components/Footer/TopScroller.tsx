'use client';

import { Icon } from '@iconify/react';

export default function TopScroller () {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
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
    )
}