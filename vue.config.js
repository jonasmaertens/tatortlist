module.exports = {
  transpileDependencies: true,
  devServer: {
    allowedHosts: ["{YOUR_DOMAIN}"],
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
