// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      openWeatherApiKey: process.env.NUXT_PUBLIC_OPENWEATHER_API_KEY,
    }
  }
})
