'use client';

import './NoArticle.scss';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function NoArticle() {
  const router = useRouter();
  return (
    <div className="no-article">
      <h2>Il n&apos;y a aucun article pour l&apos;instant...</h2>
      <div
        className="action-container"
        onClick={() => router.push('/dashboard/nouvel-article')}
      >
        <p className="action-text">Créez votre 1er article</p>
        <Icon icon="maki:arrow" className="action-icon" />
      </div>
    </div>
  );
}
