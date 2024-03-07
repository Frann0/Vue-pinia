<template>
  <div class="SearchItem_Container" @click="handleSelectProduct(product)">
    <div class="SearchItem_ImageContainer">
      <img :src="product.image" alt="Product Image" class="SearchItem_Image" />
    </div>
    <div class="SearchItem_Content">
      <h2 class="SearchItem_Title">{{ product.title }}</h2>
      <p class="SearchItem_Price">${{ product.price }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/interfaces/IProduct";
import { useProductStore } from "@/stores/products";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const router = useRouter();

const handleSelectProduct = (product: IProduct) => {
  productStore.selectProduct(product);
  router.push("/products/" + product.id);
};

defineProps<{ product: IProduct }>();
</script>
<style scoped lang="scss">
.SearchItem_Container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid var(--color-primary-20);
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  .SearchItem_ImageContainer {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    .SearchItem_Image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .SearchItem_Content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    flex-wrap: nowrap;
    height: 100%;
    .SearchItem_Title {
      font-size: 1rem;
      font-weight: bold;
      flex: 1;
      word-wrap: break-word;
    }
    .SearchItem_Price {
      font-size: 0.8rem;
      color: var(--color-accent);
    }
  }
}
</style>
