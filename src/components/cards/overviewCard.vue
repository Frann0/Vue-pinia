<template>
  <div class="Card_Container" @click="handleSelectProduct(product)">
    <div class="Card_Wrapper">
      <div class="Card_ImageContainer">
        <img
          :src="product.image"
          alt="Card Image"
          class="Card_Image"
          width="200"
          height="200"
        />
      </div>
      <div class="Card_Content">
        <h2 class="Card_Title">{{ product.title }}</h2>
        <p class="Card_Description">{{ product.description }}</p>
        <p class="Card_Price">${{ product.price }}</p>
      </div>
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

defineProps<{
  product: IProduct;
}>();
</script>

<style scoped lang="scss">
.Card_Container {
  max-width: 200px;
  max-height: 400px;
  text-decoration: none;
  color: var(--color-text);
  border: 1px solid var(--color-primary);
  background-color: var(--color-panel);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }

  .Card_Wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    flex: 1;
    .Card_ImageContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      .Card_Image {
        max-width: 100%;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
      }
    }
    .Card_Content {
      display: flex;
      flex: 1 0 0;
      flex-direction: column;
      gap: 10px;
      .Card_Title {
        font-size: 1rem;
        font-weight: bold;
        text-align: left;
      }
      .Card_Description {
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
      }
      .Card_Price {
        text-align: right;
        color: var(--color-accent);
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }
}
</style>
