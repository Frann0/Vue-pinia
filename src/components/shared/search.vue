<template>
  <div class="Search_Container">
    <div class="Search_Wrapper">
      <input
        type="text"
        placeholder="Search for products"
        @input="(e) => handleSearch(e.target.value)"
        @click="handleOpen"
        class="Search_Input"
      />
    </div>
    <div class="Search_ResultContainer" v-if="isOpen">
      <div class="Search_ResultTitleContainer">
        <h2 class="Search_ResultTitle">
          Search Results: {{ searchResult.length }}
        </h2>
      </div>
      <div class="Search_ResultWrapper">
        <SearchItem
          v-for="item in searchResult"
          :key="item.id"
          :product="item"
          @click="handleClose"
        />
      </div>
    </div>
  </div>
  <div class="Search_Backdrop" v-if="isOpen" @click="handleClose"></div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/interfaces/IProduct";
import { ref, defineProps, watch } from "vue";
import SearchItem from "./searchItem.vue";

const searchResult = ref<IProduct[]>([]);
const searchValue = ref("");
const isOpen = ref(false);

watch(searchValue, () => {
  isOpen.value = searchValue.value.length > 0;
});

const handleOpen = () => {
  isOpen.value = searchValue.value.length > 0;
};

const handleClose = () => {
  isOpen.value = false;
};

const handleSearch = (event: Event) => {
  if (!props.items) return;
  searchValue.value = event;
  searchResult.value = [];

  props.items.forEach((item) => {
    if (props.keys instanceof Array) {
      props.keys.forEach((key) => {
        let e = Object.entries(item).filter(([k, value]) => {
          return k === key && value.toLowerCase().includes(event);
        });
        if (e.length > 0) {
          searchResult.value.push(item);
        }
      });
    } else {
      let e = Object.entries(item).filter(([key, value]) => {
        return key === props.keys && value.toLowerCase().includes(event);
      });
      if (e.length > 0) {
        searchResult.value.push(item);
      }
    }
  });
};
const props = defineProps<{
  items: IProduct[] | undefined;
  keys: string | string[];
}>();
</script>

<style scoped lang="scss">
.Search_Backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.Search_Container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  max-width: 250px;
  .Search_Wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid var(--color-primary);
    border-radius: 10px;
    height: 40px;
    .Search_Input {
      width: 100%;
      padding: 1rem;
      border-radius: 10px;
      height: 100%;
      border: none;
      outline: none;
      color: var(--color-text);
      background-color: var(--color-panel);
      &::placeholder {
        color: var(--color-primary);
      }
    }
  }
  .Search_ResultContainer {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 150%;
    background-color: var(--color-panel);
    border: 1px solid var(--color-primary);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 400px;
    backdrop-filter: blur(10px);
    z-index: 100;

    .Search_ResultTitleContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      .Search_ResultTitle {
        padding: 1rem;
        padding: 1rem;
        font-size: 1rem;
        font-weight: bold;
        border-bottom: 1px solid var(--color-primary-20);
        flex: 1;
      }
    }
    .Search_ResultWrapper {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 1 0 0;
      overflow-y: auto;
      overflow-x: hidden;
      p {
        margin: 0;
      }
    }
  }
}
</style>
