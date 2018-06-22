const fs = require('fs');
const path = require('path');

const PATH_BUILD = path.join(process.cwd(), './dist');
const PATH_SERVE = path.join(process.cwd(), './serve');
const PATH_SRC = path.join(process.cwd(), './src');

module.exports = {
  serve: {
    content: PATH_SERVE,
    port: process.env.PORT || 3000,
    hot: true,
  },
  entry: path.join(PATH_SRC, './index.js'),
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: PATH_BUILD,
    filename: 'static/index.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react',
            ],
          }
        },
      },
      {
        test: /.css$/,
        exclude: /node_modules/,
        use: {
          loader: 'css-loader',
        }
      },
      {
        test: /.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        }
      }
    ],
  },
  plugins: [
    new (require('html-webpack-plugin'))({
      template: path.join(PATH_SRC, './assets/index.html'),
      filename: './index.html',
    }),
    new (require('webpack-plugin-hash'))({
      callback: (err, hash) => {
        if (!err) {
          fs.writeFileSync(path.join(PATH_BUILD, './.version'), hash);
        } else {
          throw err;
        }
      },
    })
  ],
};
