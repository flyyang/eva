const path = require('path');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = class TreeShakingModulePlugin {
  apply({ mode, config, evaConfig }) {
    const {
      vue,
      projRoot,
    } = evaConfig;

    if (vue === false) return config;

    const userTemplateCompiler = path.resolve(
      projRoot,
      'node_modules/vue-template-compiler',
    );

    const vueConfig = {
      module: {
        rules: [
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader',
                options: {
                  // eslint-disable-next-line
                  compiler: require(userTemplateCompiler),
                  hotReload: mode !== 'production',
                  productionMode: mode === 'production',
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
      ],
    };

    return merge(config, vueConfig);
  }
};
