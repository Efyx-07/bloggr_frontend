'use client';

import { useParams } from 'next/navigation';

export default function UpdateArticlePage() {
  const { articleId } = useParams();
  return (
    <div className="page">
      <div className="content">{articleId}</div>
    </div>
  );
}
