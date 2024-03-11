import { defineStore } from "pinia";
import type { UserInfo } from "@firebase/auth-types";
import { ref } from "vue";
import type { Ref } from "vue";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqqd0-r1NBFWyA1-AKZNaAtqoFM6wvamw",
  authDomain: "vue-pinia-62c12.firebaseapp.com",
  projectId: "vue-pinia-62c12",
  storageBucket: "vue-pinia-62c12.appspot.com",
  messagingSenderId: "20074445250",
  appId: "1:20074445250:web:627903d914e92d6f597e5b",
};

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<UserInfo | undefined> = ref(undefined);
  const role: Ref<string | undefined> = ref(undefined);

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }

  const setUser = (u: UserInfo) => {
    user.value = u;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential) {
        const u = userCredential.user;
        if (u) {
          setUser(u);
        }
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);

      if (
        error.code === "auth/user-not-found" ||
        error.message === "INVALID_LOGIN_CREDENTIALS"
      ) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        if (userCredential) {
          const u = userCredential.user;
          if (u) {
            setUser(u);
          }
        }
      }
    }

    try {
      await getRole().then((r) => {
        console.log(r);
        role.value = r;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRole = async () => {
    if (auth.currentUser === null) return;
    let role = await auth.currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        return idTokenResult.claims.role;
      });

    return role as string;
  };

  const logOut = async () => {
    await signOut(auth);
    user.value = undefined;
    role.value = undefined;
  };

  return {
    user,
    signIn,
    logOut,
    app,
    getRole,
    role,
  };
});
