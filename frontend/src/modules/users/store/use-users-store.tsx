import { create } from 'zustand';
import { Profile } from '@/modules/shared/types/profile';

type UserModalStore = {
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  selectedUser: Profile | null;

  openEdit: (user: Profile) => void;
  openDelete: (user: Profile) => void;
  closeModals: () => void;
};

export const useUserModals = create<UserModalStore>((set) => ({
  isEditOpen: false,
  isDeleteOpen: false,
  selectedUser: null,

  openEdit: (user) => set({ isEditOpen: true, selectedUser: user }),
  openDelete: (user) => set({ isDeleteOpen: true, selectedUser: user }),
  closeModals: () =>
    set({ isEditOpen: false, isDeleteOpen: false, selectedUser: null }),
}));
