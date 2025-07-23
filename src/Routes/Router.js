import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import DetailResep from "@/pages/DetailResep.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/detail-resep",
    component: DetailResep,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
