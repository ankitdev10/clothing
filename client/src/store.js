import { create } from "zustand";

// export interface IStore{
//   cartItems: string[];
//   addCartItem: (id: string) =>void;
//   deleteCartItem: (id: string) =>void;

// }

export const cartStore = create((set) => ({
  cartItems: [],
  addCartItem: (item) => {
    set((state) => ({ cartItems: [...state.cartItems, item] }));
  },

  deleteCartItem: (filterItems) => {
    set((state) => ({ cartItems: filterItems }));
  },
}));

export const userStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  saveUser: (user) => {
    set((state) => ({ user: { ...state.user, user } }));
  },
}));
