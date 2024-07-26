// File Store.js
import { create } from 'zustand';

export const useStoreproduct = create((set) => ({
    selectedProducts: [], 
    addSelectedProduct: (product) => { 
        set((state) => ({
            selectedProducts: [...state.selectedProducts, product],
        }));
    },
    removeSelectedProduct: (productId) => {
        set((state) => ({
            selectedProducts: state.selectedProducts.filter(product => product._id !== productId),
        }));
    },
    clearAllSelectedProducts: () => { // Tambahkan fungsi untuk menghapus semua produk dari pesanan
        set({ selectedProducts: [] });
    },
}));

