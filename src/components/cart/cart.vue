<template>
  <div class="Cart_Container">
    <button class="Cart_Wrapper" @click="handleToggleCartDropdown">
      <p class="Cart_Price">${{ cartStore.totalValue() }}</p>
      <!--Insert Cart Icon Here with icon displaying item count-->
    </button>
    <div class="Cart_DropdownContainer" v-if="cartOpen">
      <div class="Cart_TitleContainer">
        <h2 class="Cart_Title">Your Cart</h2>
      </div>
      <div v-if="cartStore.cart.length === 0" class="Cart_Empty">
        <p>Your cart is empty</p>
      </div>
      <div v-else class="Cart_Items">
        <CartItem
          v-for="item in cartStore.getCartItems()"
          :key="item.id"
          :product="item"
          @click="handleGotoProduct(item.id)"
        />
      </div>
      <div class="Cart_CheckoutContainer">
        <button @click="handleCheckout" class="Cart_Checkout">Checkout</button>
        <p class="Cart_TotalPrice">
          Total:
          <span class="Cart_PriceValue"> ${{ cartStore.totalValue() }}</span>
        </p>
      </div>
    </div>
    <div
      class="Cart_DropdownBackdrop"
      v-if="cartOpen"
      @click="handleToggleCartDropdown"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/products";
import { ref } from "vue";
import CartItem from "./cartItem.vue";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const cartStore = useCartStore();
const cartOpen = ref(false);

const router = useRouter();

const handleCheckout = () => {
  router.push("/checkout");
  cartOpen.value = false;
};

const handleGotoProduct = (id: string) => {
  productStore.selectProductById(Number.parseInt(id));
  router.push(`/products/${id}`);
  cartOpen.value = false;
};

const handleToggleCartDropdown = () => {
  cartOpen.value = !cartOpen.value;
};
</script>

<style scoped lang="scss">
.Cart_Container {
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  .Cart_Wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-primary);
    color: var(--color-text);
    padding: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    border: none;
    min-width: 100px;
    min-height: 40px;
  }

  .Cart_DropdownBackdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  .Cart_DropdownContainer {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 100%;
    min-width: 300px;
    border-radius: 10px;
    min-height: 400px;
    border: 1px solid var(--color-primary);
    background: var(--color-panel);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 100;

    .Cart_TitleContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      .Cart_Title {
        padding: 1rem;
        font-size: 1rem;
        font-weight: bold;
        border-bottom: 1px solid var(--color-primary);
        flex: 1;
        padding-bottom: 0.5rem;
        color: var(--color-text);
      }
    }
    .Cart_Empty {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
    }

    .Cart_Items {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1 0 0;
      padding: 1rem;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .Cart_CheckoutContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1rem 1rem 1rem;
      border-top: 1px solid var(--color-primary);

      .Cart_Checkout {
        padding: 0.5rem;
        background-color: var(--color-accent);
        color: var(--color-text);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        min-height: 35px;
        min-width: 100px;
        outline: none;
      }
      .Cart_TotalPrice {
        font-size: 1rem;
        color: var(--color-text);
      }
      .Cart_PriceValue {
        color: var(--color-secondary);
      }
    }
  }
}
</style>
