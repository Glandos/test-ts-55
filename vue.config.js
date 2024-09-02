/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    host: '127.0.0.1',
    compress: false,
    proxy: {
      '^/(auth|profile|api|tasks)': {
        target: 'http://fake.local'
      },
    },
  },
  productionSourceMap: false,

  configureWebpack: {
    // Use a name for cache location, especially on Jenkins that uses a shared cache location
    name: 'test-ts-55',
    devtool: isProduction ? undefined : 'source-map',
    cache: {
      type: 'filesystem',
      cacheDirectory: process.env.WEBPACK_CACHE_DIRECTORY
    },
    // optimization: {
    //   minimize: false
    // },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
        __VUE_I18N_LEGACY_API__: JSON.stringify(false),
        __INTLIFY_JIT_COMPILATION__: JSON.stringify(true),
        PRODUCTION: JSON.stringify(isProduction)
      })
    ],
    module: {
      rules: [
        {
          test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
          type: 'javascript/auto',
          loader: '@intlify/vue-i18n-loader',
          include: [ // Use `Rule.include` to specify the files of locale messages to be pre-compiled
            path.resolve(__dirname, 'src/locales')
          ]
        },
      ]
    },
  },

  chainWebpack: config => {
    // This is needed while waiting for vuetify 3
    // config.plugins.delete('fork-ts-checker')

    if (isProduction) {
      config.plugin('html').tap(options => {
        // Redefine options from https://github.com/jantimon/html-webpack-plugin#minification
        // to get minification for CSS and JS too.
        options[0].minify = {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true,
        }
        return options
      })
    }
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: true,
    }
  },
}
