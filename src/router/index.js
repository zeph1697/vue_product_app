import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Notfound from "../views/NotFound.vue";
import Hub from "../views/GPUHub.vue";
import Payment from "../views/Payment.vue";
import Billing from "../views/Billing.vue";

import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";

import store from "../store/auth";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/hub",
        name: "Hub",
        component: Hub,
      },
      {
        path: "/payment",
        name: "Payment",
        component: Payment,
      },
      {
        path: "/billing",
        name: "Billing",
        component: Billing,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: Notfound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (to.meta.isGuest && store.state.user.token) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
