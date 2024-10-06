'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function NoArticle() {
  return (
    <div
      className="
        container-style
        w-full max-w-[30rem]
        p-8
        items-center gap-4
        text-center
      "
    >
      <h2>Aucun article pour l&apos;instant...</h2>
      <Link
        href="/dashboard/nouvel-article"
        className="
          text-black
          flex items-center gap-2
          cursor-pointer
        "
      >
        <p>Créez votre 1er article</p>
        <Icon icon="maki:arrow" />
      </Link>
    </div>
  );
}
