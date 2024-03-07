<
<template>
  <div class="Title_Container">
    <h1 class="Title">{{ title }}</h1>
    <p class="Title_Paragraph" v-if="description !== undefined">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; description?: string }>();

</script>

<style scoped lang="scss">
.Title_Container {
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-bottom: 1px solid var(--color-primary);
  width: 100%;

  .Title {
    font-size: 2rem;
    color: var(--color-text);
  }

  .Title_Paragraph {
    font-size: 1rem;
    color: var(--color-secondary);
    padding-bottom: 1rem;
  }
}
</style>
