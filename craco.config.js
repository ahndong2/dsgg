// src/craco.config.js
const CracoAlias = require('craco-alias');

const craco = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    configure: {
      output: {
        // filename: 'static/js/[name].js'
      },
    },
  },
};
if (process.env.REACT_APP_APP_ENV === 'development') {
  // console.log(process.env.REACT_APP_APP_ENV);
  // craco.webpack.configure.output = { ...craco.webpack.configure.output, publicPath: '/client/' };
}

module.exports = craco;
