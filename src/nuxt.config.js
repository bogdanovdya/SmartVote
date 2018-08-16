module.exports = {
  modules: [
    '@nuxtjs/axios'
  ],
  /*
   ** Global css libs
   */
  css: [{
      src: '~assets/styles/config.scss',
      lang: 'sass'
    },
    {
      src: '~assets/styles/common.scss',
      lang: 'sass'
    }
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: 'smartvote',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#0070d2'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
