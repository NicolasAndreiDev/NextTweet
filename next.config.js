/** @type {import('next').NextConfig} */
const withEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const webpack = require('webpack');

dotenvLoad();

module.exports = withEnv({
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.ProvidePlugin({
        fs: 'fs',
      })
    );
    return config;
  },
});
