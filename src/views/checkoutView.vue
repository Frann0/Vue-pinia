<template>
  <div class="Checkout_Container">
    <Title title="Checkout" />
    <div class="Checkout_Wrapper">
      <div class="Checkout_NoItems" v-if="cartStore.cart.length === 0">
        <p class="Checkout_NoItemsParagraph">Your cart is empty</p>
      </div>
      <CartViewItem
        v-for="item in cartStore.getCartItems()"
        :key="item.id"
        :product="item"
      />
    </div>
    <div class="Checkout_Summary">
      <p class="Checkout_SummaryTitle">
        Total: <span class="Checkout_Total">${{ cartStore.totalValue() }}</span>
      </p>
      <button class="Checkout_CheckoutButton" @click="cartStore.clearCart()">
        Clear Cart
      </button>
      <button class="Checkout_CheckoutButton">Continue with Checkout</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Title from "@/components/shared/title.vue";
import CartViewItem from "@/components/cart/cartViewItem.vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
console.log(cartStore.cart);
</script>

<style scoped lang="scss">
.Checkout_Container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  .Checkout_Wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1 0 0;
    overlfow-y: auto;
    overflow-x: hidden;
    .Checkout_NoItems {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .Checkout_NoItemsParagraph {
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--color-primary-20);
      }
    }
  }
  .Checkout_Summary {
    min-height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    border-radius: 10px;
    background-color: var(--color-panel);
    gap: 1rem;
    .Checkout_SummaryTitle {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text);
      display: flex;
      align-items: center;
      flex: 1;
      .Checkout_Total {
        color: var(--color-secondary);
      }
    }
    .Checkout_CheckoutButton {
      padding: 0.5rem 1rem;
      border-radius: 10px;
      background-color: var(--color-accent);
      color: var(--color-text);
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      outline: none;
      border: none;
      transition: all 0.2s ease-in-out;
      &:hover {
        scale: 1.05;
      }
    }
  }
}
</style>
