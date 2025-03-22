// modules/products/store/use-products-modal-store.ts
import { Product } from '@/modules/shared/types/product';
import { create } from 'zustand';

type ProductModalsState = {
  createOpen: boolean;
  editOpen: boolean;
  deleteOpen: boolean;
  selected?: Product | null;
  openCreate: () => void;
  openEdit: (product: Product) => void;
  openDelete: (product: Product) => void;
  close: () => void;
};

export const useProductModals = create<ProductModalsState>((set) => ({
  createOpen: false,
  editOpen: false,
  deleteOpen: false,
  selected: null,

  openCreate: () => set({ createOpen: true }),
  openEdit: (product) => set({ selected: product, editOpen: true }),
  openDelete: (product) => set({ selected: product, deleteOpen: true }),
  close: () =>
    set({
      createOpen: false,
      editOpen: false,
      deleteOpen: false,
      selected: null,
    }),
}));
