import { create } from 'zustand';

interface State {
  isPublishArticleModalOpen: boolean;
  openPublishArticleModal: (articleId: number) => void;
  closePublishArticleModal: () => void;
  modalArticleId: number | null;
}

const useModalStore = create<State>((set) => ({
  isPublishArticleModalOpen: false,
  modalArticleId: null,
  openPublishArticleModal(articleId) {
    set({ modalArticleId: articleId });
    set({ isPublishArticleModalOpen: true });
  },
  closePublishArticleModal() {
    set({ modalArticleId: null });
    set({ isPublishArticleModalOpen: false });
  },
}));

export default useModalStore;
