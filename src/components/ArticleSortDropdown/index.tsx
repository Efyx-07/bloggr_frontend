import { Icon } from '@iconify/react';
import './ArticleSortDropdown.css';

export default function ArticleSortDropdown() {
  return (
    <div
      className="
      dropdown-container 
      block relative
      w-full max-w-96 h-10
      "
    >
      <select
        className="
          dropdown
          relative z-10
          w-full h-full 
          appearance-none outline-none
          px-4
          bg-transparent
          border border-black25 rounded
          text-black
          cursor-pointer
        "
      >
        <option value="">-- Afficher par</option>
        <option value="">Publiés</option>
        <option value="">En attente de publication</option>
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon absolute z-0 text-3xl text-black"
      />
    </div>
  );
}
