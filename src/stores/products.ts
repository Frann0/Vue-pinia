import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IProduct } from "@/interfaces/IProduct";
import type { Ref } from "vue";
import { faker } from "@faker-js/faker";

export const useProductStore = defineStore("products", () => {
  const products: Ref<IProduct[]> = ref([{} as IProduct]);

  const generateProducts = () => {
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
        image: faker.image.urlPicsumPhotos({ width: 256, height: 256 }),
        id: i,
      };
      productsArray.push(product);
    }
    products.value = productsArray;
  };
  const totalProducts = computed(() => products.value.length);

  function getProductById(id: number) {
    return products.value.find((product) => product.id === id);
  }

  return { generateProducts, products, totalProducts, getProductById };
});
