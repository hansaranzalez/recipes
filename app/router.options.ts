import type { RouterConfig } from "@nuxt/schema";

export default {
    routes: (_routes) => [
        {
            name: "home",
            path: "/:id?",
            component: () => import("~/pages/home.vue"),
        },
    ],
} satisfies RouterConfig;