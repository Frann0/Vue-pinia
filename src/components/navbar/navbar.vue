<template>
  <nav class="Nav_Container">
    <router-link to="/" class="logo_link"> Generic Brand </router-link>
    <router-link to="/about" class="nav-link" active-class="nav-linkSelected"
      >Home</router-link
    >
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.Nav_Container {
  height: 3rem;
  width: 100%;
  display: flex;
  padding: 1rem;
  background-color: var(--color-panel);
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  align-items: center;
  position: sticky;
  .logo_link {
    font-size: 1.5rem;
    color: var(--color-text);
    margin-right: 1rem;
    text-decoration: none;
    cursor: pointer;
    flex: 1;
  }

  .nav-link {
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
  }

  .nav-linkSelected {
    color: var(--color-accent);
    text-decoration: underline;
  }
}
</style>
