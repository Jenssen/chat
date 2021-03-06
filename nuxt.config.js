module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['bulma/css/bulma.css', '~assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    vendor: ['socket.io-client', 'vuelidate'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [{ src: '~plugins/socket.io.js', ssr: false }, '~plugins/vuelidate.js'],
  modules: [
    ['@nuxtjs/google-analytics']
  ],
  'google-analytics': {
    id: 'UA-112614930-2'
  }
}
