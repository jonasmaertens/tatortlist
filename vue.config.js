module.exports = {
  transpileDependencies: true,
  devServer: {
    allowedHosts: ["***REMOVED***"],
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
