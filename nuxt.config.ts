export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }, 
  colorMode: {
    classSuffix: ''
  }, 
  googleFonts: {
    families: {
      Poppins: [400]
    },
  },
  css: ['@/assets/css/global.css']
})