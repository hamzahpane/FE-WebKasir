import { create } from "zustand";

export  const  useStoreAddres = create((set)=>({

    selectedAddres: [], 
    addSelectedAddres: (address) => { 
    set((state) => ({
        selectedAddres: [...state.selectedAddres, address],
    }));
},

clearAllSelectedAddres: () => { // Tambahkan fungsi untuk menghapus semua produk dari pesanan
    set({ selectedAddres: [] });
},
}));