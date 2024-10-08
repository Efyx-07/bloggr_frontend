import { Article } from '@/interfaces/article.interface';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface PublishedStatusProps {
  article: Article;
}

export default function PublishedStatus({ article }: PublishedStatusProps) {
  const router = useRouter();
  const status: string = article.published
    ? 'Publié'
    : 'En attente de publication';
  const iconName: string = article.published
    ? 'grommet-icons:status-good'
    : 'tdesign:time';

  return (
    <div
      onClick={() => router.push(`/dashboard/article/${article.id}`)}
      className={`
        w-full max-w-[11rem]
        flex items-center justify-center gap-1
        text-xs font-semibold
        border rounded
        p-1
        ${article.published ? 
          'text-greenColor border-greenColor hover:text-white hover:bg-greenColor' 
          : 
          'text-accent border-accent hover:text-white hover:bg-accent'
        }
        cursor-pointer
      `}
    >
      <Icon icon={iconName} />
      <p>{status}</p>
    </div>
  );
}
