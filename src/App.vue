<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/navbar/navbar.vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/products";
import { onBeforeMount } from "vue";

const cartStore = useCartStore();
const productStore = useProductStore();

onBeforeMount(() => {
  if (
    productStore.products === undefined ||
    productStore.products.length === 0
  ) {
    productStore.generateProducts();
  }

  if (cartStore.cart.length === 0) {
    cartStore.deserializeCart();
  }
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
