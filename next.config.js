/** @type {import('next').NextConfig} */
require('dotenv').config();
const withImages = require('next-images');
module.exports = withImages({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/_next/static/pdf', // Adjust the publicPath as needed
            outputPath: 'static/pdf', // Output path for PDF files
          },
        },
      ],
    });

    return config;
  },
});

