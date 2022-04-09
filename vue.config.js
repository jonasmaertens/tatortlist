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
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
};
