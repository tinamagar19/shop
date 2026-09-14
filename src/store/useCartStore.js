import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(item => item.id === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.id !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      // Computed properties
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTotalItems: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'shopease-cart-storage', // unique name
    }
  )
);

export default useCartStore;
