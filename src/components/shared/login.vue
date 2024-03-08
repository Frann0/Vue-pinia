<template>
  <div class="Login_Container">
    <div class="Login_NotLoggedIn" v-if="authStore.user === undefined">
      <button class="Login_Button" @click="handleOpen">Login</button>
      <div class="Login_Wrapper" v-if="isOpen">
        <input
          type="text"
          class="Login_Input"
          placeholder="Username"
          @input="username = $event.target.value"
        />
        <input
          type="password"
          class="Login_Input"
          placeholder="Password"
          @input="password = $event.target.value"
        />
        <button class="Login_Button" @click="login">Submit</button>
      </div>
    </div>
    <div class="Login_LoggedIn" v-else @click="handleOpen">
      <p class="Login_User">{{ authStore.user.email }}</p>
      <div class="Login_Wrapper" v-if="isOpen">
        <button class="Login_Button" @click="logout">Logout</button>
      </div>
    </div>
  </div>
  <div
    class="Login_Backdrop"
    @click="() => (isOpen = false)"
    v-if="isOpen"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const isOpen = ref(false);

const handleOpen = () => {
  isOpen.value = !isOpen.value;
};

const login = async () => {
  await authStore.signIn(username.value, password.value);
};

const logout = async () => {
  await authStore.logOut();
};
</script>

<style scoped lang="scss">
.Login_Backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.Login_Container {
  display: flex;

  .Login_NotLoggedIn {
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    .Login_Button {
      background-color: var(--color-accent);
      color: var(--color-text);
      border: none;
      padding: 0.5rem;
      margin: 0.5rem;
      cursor: pointer;
      border-radius: 10px;
      min-width: 150px;
      &:focus {
        outline: none;
      }
    }
    .Login_Wrapper {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      right: 0;
      min-width: 150px;
      background-color: var(--color-panel);
      border: 1px solid var(--color-primary);
      border-radius: 10px;
      padding: 1rem;
      z-index: 100;
      backdrop-filter: blur(10px);
      .Login_Input {
        margin: 0.5rem;
        padding: 0.5rem;
        border: 1px solid var(--color-primary);
        border-radius: 10px;
        background-color: var(--color-panel);
        color: var(--color-text);
        &:focus {
          outline: none;
        }
      }
      .Login_Button {
        background-color: var(--color-accent);
        color: var(--color-text);
        border: none;
        padding: 0.5rem;
        margin: 0.5rem;
        cursor: pointer;
      }
    }
  }
  .Login_LoggedIn {
    display: flex;
    flex-direction: column;
    position: relative;

    .Login_User {
      padding: 0 1rem;
      min-height: 40px;
      color: var(--color-text);
      cursor: pointer;
      background-color: var(--color-panel);
      border: 1px solid var(--color-primary);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .Login_Button {
      background-color: var(--color-accent);
      color: var(--color-text);
      border: none;
      padding: 0.5rem;
      margin: 0.5rem;
      cursor: pointer;
    }
    .Login_Wrapper {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      min-width: 150px;
      width: 100%;
      background-color: var(--color-panel);
      border: 1px solid var(--color-primary);
      border-radius: 10px;
      padding: 0.5rem;
      z-index: 100;
      backdrop-filter: blur(10px);

      .Login_Button {
        background-color: var(--color-accent);
        color: var(--color-text);
        border: none;
        padding: 0.5rem;
        margin: 0.5rem;
        cursor: pointer;
        border-radius: 10px;
      }
    }
  }
}
</style>
