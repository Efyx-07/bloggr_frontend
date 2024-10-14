import { Icon } from '@iconify/react';
import useArticlesFilterStore from '@/stores/articlesFilterStore';
import './ArticleSortDropdown.css';
import { Article } from '@/interfaces/article.interface';

interface ArticleSortDropdownProps {
  articles: Article[];
}

export default function ArticleSortDropdown({
  articles,
}: ArticleSortDropdownProps) {
  const { setFilter } = useArticlesFilterStore();

  // Utilise la méthode du store pour gérér les états des filtres
  // ===========================================================================================
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    setFilter(value as 'all' | 'published' | 'unpublished');
  };

  // Récupère la longueur des tableaux d'articles selon les filtres pour gérer un affichage conditionnel
  // ===========================================================================================
  const publishedArticlesLength = articles.filter(
    (article) => article.published,
  ).length;
  const unpublishedArticlesLength = articles.filter(
    (article) => !article.published,
  ).length;
  // ===========================================================================================

  return (
    <div className="dropdown-container block relative w-full max-w-96 h-10">
      <select
        className="dropdown relative z-10 w-full h-full appearance-none outline-none
          px-4 bg-transparent border border-black25 rounded text-black text-sm font-medium cursor-pointer"
        onChange={handleFilterChange}
      >
        <option value="all">Tous les articles ({articles.length})</option>
        {publishedArticlesLength &&
          publishedArticlesLength !== articles.length && (
            <option value="published">
              Publiés ({publishedArticlesLength})
            </option>
          )}
        {unpublishedArticlesLength &&
          unpublishedArticlesLength !== articles.length && (
            <option value="unpublished">
              En attente de publication ({unpublishedArticlesLength})
            </option>
          )}
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon absolute z-0 text-3xl text-black"
      />
    </div>
  );
}
