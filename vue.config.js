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
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "TatortList";
      return args;
    });
  },
};
