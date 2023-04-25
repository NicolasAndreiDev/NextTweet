/** @type {import('next-env')} */
const dotenvLoad = require('dotenv-load');

dotenvLoad();

module.exports = {
  future: {
    webpack5: true, 
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, 
    };

    return config;
  },
};
