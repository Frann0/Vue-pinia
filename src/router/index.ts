import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/products/:id",
      name: "products",
      component: () => import("@/views/ProductView.vue"),
    },
    {
      path: "/checkout",
      name: "cart",
      component: () => import("@/views/checkoutView.vue"),
    },
  ],
});

export default router;
