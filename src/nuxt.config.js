export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cn-vep',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss',
    'bulma-calendar/dist/css/bulma-calendar.min.css',
    'bulma-divider/dist/css/bulma-divider.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'nuxt-logger',
    'nuxt-buefy'
  ],

  router: {
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/api/',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'user/authenticate', method: 'post', propertyName: 'data' },
          user: { url: 'user/account', method: 'get', propertyName: 'data' },
          logout: false
        },
        user: {
          property: false
        }
      }
    }
  },

  // Toast module configuration
  toast: {
    position: 'bottom-center',
    duration: '5000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
