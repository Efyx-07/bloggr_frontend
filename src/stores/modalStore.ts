import { create } from 'zustand';

interface State {
  // State pour l'overlay des modales
  isOverlayVisible: boolean;
  // State pour la modale publish-article
  isPublishArticleModalOpen: boolean;
  openPublishArticleModal: (articleId: number) => void;
  closePublishArticleModal: () => void;
  modalArticleId: number | null;
  // State pour burger-menu
  isBurgerMenuOpen: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
}

const useModalStore = create<State>((set) => ({
  isOverlayVisible: false,
  // State et methodes pour modale publish-article
  //==============================================
  isPublishArticleModalOpen: false,
  modalArticleId: null,
  openPublishArticleModal(articleId) {
    set({ modalArticleId: articleId });
    set({ isPublishArticleModalOpen: true, isOverlayVisible: true });
  },
  closePublishArticleModal() {
    set({ modalArticleId: null });
    set({ isPublishArticleModalOpen: false, isOverlayVisible: false });
  },

  // State et methodes pour modale publish-article
  //==============================================
  isBurgerMenuOpen: false,
  openBurgerMenu() {
    set({ isBurgerMenuOpen: true, isOverlayVisible: true });
  },
  closeBurgerMenu() {
    set({ isBurgerMenuOpen: false, isOverlayVisible: false });
  },
}));

export default useModalStore;
