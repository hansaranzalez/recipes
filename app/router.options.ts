import type { RouterConfig } from "@nuxt/schema";

export default {
    routes: (_routes) => [
        {
            name: "home",
            path: "/",
            component: () => import("~/pages/home.vue"),
        },
        {
            path: '/meals/:id',
            component: () => import('~/pages/recipeInfo.vue'),
        }
    ],
} satisfies RouterConfig;