import { create } from 'zustand';

interface State {
    isPublishArticleModalOpen: boolean;
    openPublishArticleModal: () => void;
    closePublishArticleModal: () => void;
}

const useModalStore = create<State>((set) => ({
    isPublishArticleModalOpen: false,
    openPublishArticleModal() {
        set({isPublishArticleModalOpen: true});
    },
    closePublishArticleModal() {
        set({isPublishArticleModalOpen: false});
    },
}));

export default useModalStore;