import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    size: string,
    color: string
  ) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    size: string,
    color: string
  ) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity, size, color) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.productId === product._id &&
              item.size === size &&
              item.color === color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product._id &&
                item.size === size &&
                item.color === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product._id,
                product,
                quantity,
                size,
                color,
              },
            ],
          };
        }),
      removeFromCart: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.size === size &&
                item.color === color
              )
          ),
        })),
      updateQuantity: (productId, quantity, size, color) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product.discountPrice || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-store",
    }
  )
);
