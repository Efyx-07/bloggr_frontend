import { create } from 'zustand';

interface State {
  // State pour l'overlay des modales
  isOverlayVisible: boolean;

  // State pour l'id de l'article selectionné
  modalArticleId: number | null;

  // State pour la modale publish-article
  isPublishArticleModalOpen: boolean;
  openPublishArticleModal: (articleId: number) => void;
  closePublishArticleModal: () => void;

  // State pour la modale delete-article
  isDeleteArticleModalOpen: boolean;
  openDeleteArticleModal: (articleId: number) => void;
  closeDeleteArticleModal: () => void;

  // State pour burger-menu
  isBurgerMenuOpen: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
}

const useModalStore = create<State>((set) => ({
  // initialise les states
  // ===========================================================================================
  isOverlayVisible: false,
  modalArticleId: null,

  // States et methodes pour modale publish-article
  // ===========================================================================================
  isPublishArticleModalOpen: false,
  openPublishArticleModal(articleId) {
    set({ modalArticleId: articleId });
    set({ isPublishArticleModalOpen: true, isOverlayVisible: true });
  },
  closePublishArticleModal() {
    set({ modalArticleId: null });
    set({ isPublishArticleModalOpen: false, isOverlayVisible: false });
  },

  // States et methodes pour modale delete-article
  // ===========================================================================================
  isDeleteArticleModalOpen: false,
  openDeleteArticleModal(articleId) {
    set({ modalArticleId: articleId });
    set({ isDeleteArticleModalOpen: true, isOverlayVisible: true });
  },
  closeDeleteArticleModal() {
    set({ modalArticleId: null });
    set({ isDeleteArticleModalOpen: false, isOverlayVisible: false });
  },

  // States et methodes pour burger-menu
  // ===========================================================================================
  isBurgerMenuOpen: false,
  openBurgerMenu() {
    set({ isBurgerMenuOpen: true, isOverlayVisible: true });
  },
  closeBurgerMenu() {
    set({ isBurgerMenuOpen: false, isOverlayVisible: false });
  },
}));

export default useModalStore;
