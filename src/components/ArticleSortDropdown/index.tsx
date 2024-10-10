import { Icon } from '@iconify/react';

export default function ArticleSortDropdown() {
  return (
    <div>
      <select name="" id="">
        <option value="">-- Afficher par</option>
        <option value="">Publiés</option>
        <option value="">En attente de publication</option>
        <Icon
          icon="material-symbols-light:play-arrow"
        />
      </select>
    </div>
  );
}
