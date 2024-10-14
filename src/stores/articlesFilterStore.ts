import { create } from 'zustand';

interface State {
  filter: 'all' | 'published' | 'unpublished';
  setFilter: (filter: 'all' | 'published' | 'unpublished') => void;
}

// Centralise l'état des filtres pour l'affichage des articles
// ===========================================================================================
const useArticlesFilterStore = create<State>((set) => ({
  filter: 'all', // Définit la valeur 'all' par défaut
  setFilter: (filter) => set({ filter }),
}));

export default useArticlesFilterStore;
