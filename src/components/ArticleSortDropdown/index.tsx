import { Icon } from '@iconify/react';
import './ArticleSortDropdown.css';

export default function ArticleSortDropdown() {
  return (
    <div className="dropdown-container w-full h-10 relative">
      <select
        className="
            dropdown
            relative
            w-full h-full 
            px-4
            text-black
            border border-black25 rounded
            cursor-pointer
        "
      >
        <option value="">-- Afficher par</option>
        <option value="">Publiés</option>
        <option value="">En attente de publication</option>
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon absolute text-black"
      />
    </div>
  );
}
