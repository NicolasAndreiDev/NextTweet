/** @type {import('next-env')} */
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        path: false,
        fs: false,
      };
      
      return config;
    },
}


module.exports = nextConfig
