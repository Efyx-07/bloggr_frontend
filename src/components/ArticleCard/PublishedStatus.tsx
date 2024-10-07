import { Article } from '@/interfaces/article.interface';
import { Icon } from '@iconify/react';

interface PublishedStatusProps {
  article: Article;
}

export default function PublishedStatus({ article }: PublishedStatusProps) {
  const status: string = article.published ? "Publié" : "En attente de publication";
  const iconName: string = article.published ? "grommet-icons:status-good" : "tdesign:time";
  
  return (
    <div 
      className={`
        w-full max-w-48
        flex items-center justify-center gap-1
        text-sm font-medium
        border 
        ${article.published ? "text-green-600 border-green-600": "text-red-600 border-red-600"}
      `}
    >
      <Icon icon={iconName} />
      <p>{status}</p>
    </div>
  );
}
