import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IProduct } from "@/interfaces/IProduct";
import type { Ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cart: Ref<IProduct[]> = ref([]);

  const addToCart = (product: IProduct) => {
    cart.value.push(product);
  };
  const totalCartItems = computed(() => cart.value.length);

  const clearCart = () => {
    cart.value = [];
  };
  const removeItem = (index: number) => {
    cart.value.splice(index, 1);
  };

  const totalValue = () => {
    //return total value of cart item
    return cart.value.length === 0
      ? 0
      : cart.value.reduce((acc, item) => acc + item.price, 0);
  };

  return {
    addToCart,
    cart,
    totalCartItems,
    clearCart,
    removeItem,
    totalValue,
  };
});
