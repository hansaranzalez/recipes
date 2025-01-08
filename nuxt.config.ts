// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ],
  ssr: false,
  plugins: ["~/plugins/pinia.client.ts", "~/plugins/services.client.ts"],
})