'use client';

import './NoArticle.scss';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function NoArticle() {
  return (
    <div className="no-article">
      <h2>Aucun article pour l&apos;instant...</h2>
      <Link className="action-container" href="/dashboard/nouvel-article">
        <p className="action-text">Créez votre 1er article</p>
        <Icon icon="maki:arrow" className="action-icon" />
      </Link>
    </div>
  );
}
