<template>
  <div class="CartViewItem_Container">
    <div class="CartViewItem_Wrapper">
      <div class="CartViewItem_ImageContainer">
        <img
          class="CartViewItem_Image"
          :src="product.image"
          alt="product.name"
        />
      </div>
      <div class="CartViewItem_TitleContainer">
        <h3 class="CartViewItem_Title" @click="handleGotoProduct">
          {{ product.title }}
        </h3>
      </div>
      <div class="CartViewItem_CountContainer">
        <button
          @click="cartStore.removeOneItem(product.id)"
          class="CartViewItem_Button"
        >
          -
        </button>
        <input
          type="number"
          class="CartViewItem_Count"
          :value="cartStore.itemOccurence(product.id)"
          @input="cartStore.setOccurence(product, $event.target.value)"
        />
        <button
          @click="cartStore.addToCart(product)"
          class="CartViewItem_Button"
        >
          +
        </button>
      </div>
      <div class="CartViewItem_PriceContainer">
        <span class="CartViewItem_Price"
          >${{ cartStore.getTotalValueOfItem(product.id) }}</span
        >
      </div>
    </div>
    <div class="CartViewItem_Wrapper">
      <p class="CartViewItem_Stock">
        {{ product.quantity > 0 ? "In Stock" : "Out of Stock" }}
      </p>
      <button
        class="CartViewItem_RemoveButton"
        @click="cartStore.removeAllItemOccurence(product.id)"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/interfaces/IProduct";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/products";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const cartStore = useCartStore();
const productStore = useProductStore();
const router = useRouter();

const handleGotoProduct = () => {
  productStore.selectProduct(props.product);
  router.push(`/products/${props.product.id}`);
};

const props = defineProps<{
  product: IProduct;
}>();
</script>

<style scoped lang="scss">
.CartViewItem_Container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-height: 150px;
  border-bottom: 1px solid var(--color-primary-20);
  padding: 1rem;
  &:last-child {
    border-bottom: none;
  }

  .CartViewItem_Wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    flex: 1;
    gap: 10px;

    .CartViewItem_ImageContainer {
      width: 100px;
      height: 100px;
      .CartViewItem_Image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }
    }
    .CartViewItem_TitleContainer {
      flex: 1;
      cursor: pointer;
      .CartViewItem_Title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--color-secondary);
      }
    }
    .CartViewItem_CountContainer {
      flex: 1;
      display: flex;
      max-width: fit-content;
      max-height: 30px;
      .CartViewItem_Button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-top: 1px solid var(--color-primary);
        border-bottom: 1px solid var(--color-primary);
        background: var(--color-panel);
        color: var(--color-primary);
        outline: none;
        cursor: pointer;

        &:first-child {
          border-left: 1px solid var(--color-primary);
          border-right: none;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        &:last-child {
          border-right: 1px solid var(--color-primary);
          border-left: none;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
      .CartViewItem_Count {
        font-size: 1rem;
        font-weight: 300;
        color: var(--color-text);
        padding: 0 10px;
        border-top: 1px solid var(--color-primary);
        border-bottom: 1px solid var(--color-primary);
        background: var(--color-panel);
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 50px;
        border-left: none;
        border-right: none;
        max-width: 50px;
        text-align: center;
        flex: 1;
        outline: none;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
    .CartViewItem_PriceContainer {
      min-width: 100px;
      display: flex;
      justify-content: flex-end;
      .CartViewItem_Price {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-secondary);
      }
    }
    .CartViewItem_Stock {
      color: var(--color-text);
      font-size: 1rem;
      flex: 1;
      display: flex;
      align-items: center;
    }
    .CartViewItem_RemoveButton {
      padding: 5px 10px;
      background-color: var(--color-danger);
      color: var(--color-white);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: var(--color-danger-dark);
      }
    }
  }
}
</style>
