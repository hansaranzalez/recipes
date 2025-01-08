// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    ["@nuxtjs/i18n", { vueI18n: "./i18n/i18n.config.ts" }],
    '@vueuse/nuxt',
  ],
  ssr: false,
  plugins: ["~/plugins/pinia.client.ts", "~/plugins/services.client.ts"],
})