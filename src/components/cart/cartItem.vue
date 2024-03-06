<template>
  <div class="CartItem_Container">
    <div class="CartItem_ImageContainer">
      <img class="CartItem_Image" :src="product.image" alt="product image" />
    </div>
    <div class="CartItem_ContentContainer">
      <p class="CartItem_Title">
        {{ product.title }}
      </p>
      <p class="CartItem_Count">
        {{ cartStore.itemOccurence(product.id) }}x ${{ product.price }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/interfaces/IProduct";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

defineProps<{
  product: IProduct;
}>();
</script>

<style lang="scss" scoped>
.CartItem_Container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 10px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .CartItem_ImageContainer {
    width: 60px;
    height: 60px;
    border-radius: 10px;

    .CartItem_Image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .CartItem_ContentContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    .CartItem_Title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text);
      margin: 0;
    }
    .CartItem_Count {
      font-size: 1rem;
      color: var(--color-secondary);
      margin: 0;
      width: 100%;
      text-align: right;
    }
  }
}
</style>
