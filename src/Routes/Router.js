import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import DetailResep from "@/pages/DetailResep.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/detail-resep/:id",
    name: "DetailResep",
    component: DetailResep,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
