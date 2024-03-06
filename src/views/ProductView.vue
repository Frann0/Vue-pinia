<template>
  <div class="Product_Container">
    <div class="Product_Wrapper">
      <div class="Product_ImageContainer">
        <img
          :src="productStore.selectedProduct.image"
          alt="Product Image"
          class="Product_Image"
        />
      </div>
      <div class="Product_ContentContainer">
        <h2 class="Product_Title">{{ productStore.selectedProduct.title }}</h2>
        <p class="Product_Description">
          {{ productStore.selectedProduct.description }}
        </p>
        <div class="Product_Dropdowns">
          <div class="Product_SizesContainer">
            <label for="size">Size:</label>
            <div
              class="Product_DropdownContainer"
              @click="handleToggleSizeDropdown()"
            >
              {{ selectedSize === "" ? "Select Size" : selectedSize }}
              <div v-if="sizeOpen" class="Product_DropdownWrapper">
                <div
                  class="Product_DropdownValue"
                  v-for="size in productStore.selectedProduct.sizes"
                  @click="handleSelectSize(size)"
                >
                  {{ size }}
                </div>
              </div>
            </div>
          </div>
          <div class="Product_SizesContainer">
            <label for="color">Color:</label>
            <div
              class="Product_DropdownContainer"
              @click="handleToggleColorDropdown()"
            >
              {{ selectedColor === "" ? "Select Color" : selectedColor }}
              <div v-if="colorsOpen" class="Product_DropdownWrapper">
                <div
                  class="Product_DropdownValue"
                  v-for="color in productStore.selectedProduct.colors"
                  @click="handleSelectColor(color)"
                >
                  {{ color }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Product_PriceContainer">
          <p class="Product_Price">${{ productStore.selectedProduct.price }}</p>
          <div class="Product_Info">
            <p class="Product_Text">
              In Stock:
              <span class="Product_Stock">
                {{ productStore.selectedProduct.quantity }}
              </span>
            </p>
            <p class="Product_Text">
              Free Shipping on orders over
              <span class="Product_Shipping">$50</span>
            </p>
          </div>
        </div>

        <button
          class="Product_AddToCart"
          @click="cartStore.addToCart(productStore.selectedProduct)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/shared/title.vue";
import { useProductStore } from "../stores/products";
import { useCartStore } from "@/stores/cart";
import { ref } from "vue";

let sizeOpen = ref(false);
let colorsOpen = ref(false);
const selectedColor = ref("");
const selectedSize = ref("");
const productStore = useProductStore();
const cartStore = useCartStore();

const handleToggleSizeDropdown = () => {
  sizeOpen.value = !sizeOpen.value;
};

const handleToggleColorDropdown = () => {
  colorsOpen.value = !colorsOpen.value;
};

const handleSelectColor = (color: string) => {
  selectedColor.value = color;
  colorsOpen = false;
};

const handleSelectSize = (size: string) => {
  console.log(size);
  selectedSize.value = size;
  sizeOpen = false;
};

const handleAddToCart = () => {
  cartStore.addToCart(productStore.selectedProduct);
};
</script>

<style scoped lang="scss">
.Product_Container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  .Product_Wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2rem;

    .Product_ImageContainer {
      display: flex;
      flex: 1;
      justify-content: start;
      align-items: start;
      height: fit-content;
      border: 2px solid var(--color-primary);
      border-radius: 10px;
      .Product_Image {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
        aspect-ratio: 1/1;
        flex: 1;
        border-radius: 10px;
      }
    }

    .Product_ContentContainer {
      flex: 0.75;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .Product_AddToCart {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: var(--color-accent);
        color: var(--color-text);
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        height: 60px;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
          background-color: var(--color-secondary);
        }
      }

      .Product_PriceContainer {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
        .Product_Info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          .Product_Text {
            font-size: 1rem;
            color: var(--color-text);
          }
          .Product_Stock {
            font-size: 1rem;
            color: var(--color-secondary);
          }
          .Product_Shipping {
            font-size: 1rem;
            color: var(--color-accent);
          }
        }
        .Product_Price {
          font-size: 1.75rem;
          color: var(--color-text);
          font-weight: bold;
          background-color: var(--color-panel);
          border: 1px solid var(--color-secondary);
          min-width: 150px;
          padding: 5px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .Product_Title {
        font-size: 1.5rem;
        color: var(--color-secondary);
        font-weight: bold;
        border-bottom: 1px solid var(--color-primary);
      }
      .Product_Dropdowns {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        flex-wrap: nowrap;
        .Product_SizesContainer {
          display: flex;
          flex-direction: column;
          height: fit-content;
          gap: 0.5rem;
          flex: 1;
          .Product_DropdownContainer {
            height: 30px;
            width: 100%;
            padding: 0 10px;
            border: 1px solid var(--color-primary);
            border-radius: 5px;
            display: flex;
            position: relative;
            color: var(--color-text);
            cursor: pointer;
            align-items: center;
            .Product_DropdownWrapper {
              position: absolute;
              top: calc(100% + 10px);
              left: 0;
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 5px;
              background-color: var(--color-panel);
              border: 1px solid var(--color-primary);
              border-radius: 5px;
              z-index: 100;
              backdrop-filter: blur(10px);
              padding: 5px;
              .Product_DropdownValue {
                padding: 5px;
                transition: 0.3s ease-in-out;
                border-bottom: 1px solid var(--color-accent);
                user-select: none;
                cursor: pointer;
                &:hover {
                  border-radius: 5px;
                  background-color: var(--color-accent);
                  border: none;
                  color: var(--color-text);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
