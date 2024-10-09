'use client';

import useModalStore from '@/stores/modalStore';

export default function ModalOverlay() {
  const { isOverlayVisible } = useModalStore();
  return (
    <div
      className={`
          fixed top-0 left-0 z-40
          w-screen h-dvh
          bg-black75
          transition-opacity duration-200 ease 
          ${!isOverlayVisible ? 'invisible opacity-0' : 'visible opacity-100'}
      `}
    ></div>
  );
}
