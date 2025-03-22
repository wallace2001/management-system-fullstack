import { Order } from '@/modules/shared/types/order';
import { create } from 'zustand';

type OrdersModalStore = {
  createOpen: boolean;
  editOpen: boolean;
  deleteOpen: boolean;
  detailOpen: boolean;
  selected: Order | null;
  openCreate: () => void;
  openEdit: (order: Order) => void;
  openDelete: (order: Order) => void;
  openDetail: (order: Order) => void;
  close: () => void;
};

export const useOrdersModal = create<OrdersModalStore>((set) => ({
  createOpen: false,
  editOpen: false,
  deleteOpen: false,
  detailOpen: false,
  selected: null,
  openCreate: () =>
    set({ createOpen: true, editOpen: false, deleteOpen: false, detailOpen: false, selected: null }),
  openEdit: (order) =>
    set({ editOpen: true, createOpen: false, deleteOpen: false, detailOpen: false, selected: order }),
  openDelete: (order) =>
    set({ deleteOpen: true, createOpen: false, editOpen: false, detailOpen: false, selected: order }),
  openDetail: (order) =>
    set({ detailOpen: true, createOpen: false, editOpen: false, deleteOpen: false, selected: order }),
  close: () =>
    set({ createOpen: false, editOpen: false, deleteOpen: false, detailOpen: false, selected: null }),
}));
