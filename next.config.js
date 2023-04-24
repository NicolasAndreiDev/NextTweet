/** @type {import('next').NextConfig} */
const withEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

module.exports = withEnv({
  reactStrictMode: true,
});