import { createRouter, createWebHistory } from "vue-router";
import DataTableEditDemo from "./DataTableEditDemo.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: DataTableEditDemo }]
});