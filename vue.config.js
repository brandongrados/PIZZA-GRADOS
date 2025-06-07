const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        crypto: require.resolve('crypto-browserify'),
        querystring: require.resolve('querystring-es3'),
        url: require.resolve('url/'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: false, // fs no es compatible con el navegador
      },
    },
  },
});