export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'iotalert',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Complete Iot Solution Neofox.com'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/logo.png'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/scss/bootstrap.scss',],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/bootstrap.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['bootstrap-vue/nuxt'],

    bootstrapVue: {
        bootstrapCSS: false,
        icons: true,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
