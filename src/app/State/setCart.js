import { create } from "zustand";

export const useOrderItems = create((set) => ({
  selectedCart: [],
  addSelectedItem: (orderItem) => {
    set((state) => ({
      selectedCart: [...state.selectedCart, orderItem], 
    }));
  },
}));
