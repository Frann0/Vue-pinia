<script setup lang="ts">
import Navbar from "../components/navbar/navbar.vue";
import Title from "../components/shared/title.vue";
import { onMounted } from "vue";
import { useProductStore } from "../stores/products";
import OverviewCard from "../components/cards/overviewCard.vue";

const productStore = useProductStore();

onMounted(() => {
  productStore.generateProducts();
  console.log("Mounted", productStore.products);
});
</script>

<template>
  <main class="Home_Container">
    <Title
      title="Welcome to Generic Brand"
      description="The best place to find generic products"
    />
    <div class="Home_Wrapper">
      <OverviewCard
        v-for="product in productStore.products"
        :product="product"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.Home_Container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  .Home_Wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    flex: 1 0 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    justify-content: center;
  }
}
</style>
