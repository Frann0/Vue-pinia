import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IProduct } from "@/interfaces/IProduct";
import type { Ref } from "vue";
import { faker } from "@faker-js/faker";

export const useProductStore = defineStore("products", () => {
  const products: Ref<IProduct[] | undefined> = ref(undefined);
  const selectedProduct: Ref<IProduct | undefined> = ref(undefined);

  const generateProducts = async () => {
    const productsArray: IProduct[] = [];

    faker.seed(123);

    for (let i = 0; i < 10; i++) {
      const product: IProduct = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseInt(faker.commerce.price()),
        sizes: ["S", "M", "L", "XL"],
        colors: [faker.color.human(), faker.color.human()],
        quantity: faker.number.int({ min: 10, max: 100 }),
        image: faker.image.urlPicsumPhotos({ width: 1000, height: 1000 }),
        id: i,
      };
      productsArray.push(product);
    }
    products.value = productsArray;
  };
  const totalProducts = computed(() =>
    products.value !== undefined ? products.value.length : 0,
  );

  function selectProduct(product: IProduct) {
    selectedProduct.value = product;
  }

  const selectProductById = async (id: number) => {
    if (products.value === undefined) {
      await generateProducts();
    }

    const product = products.value.find((p) => p.id === id);

    if (product !== undefined) {
      selectedProduct.value = product;
    }
  };

  const getProducts = computed(() => products.value);

  return {
    generateProducts,
    products,
    totalProducts,
    selectProduct,
    selectedProduct,
    selectProductById,
    getProducts,
  };
});
