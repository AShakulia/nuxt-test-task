// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Lato: [400, 500, 700],
      'Changa One': [400]
    },
    display: 'swap',
  },

  css: ['~/assets/styles/main.scss']
})
