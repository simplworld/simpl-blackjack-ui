const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const p = require('babel-plugin-transform-class-properties');
const postcssPresetEnv = require('postcss-preset-env');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


// Adjust publicPath depending on local or prod
let publicPath = 'http://localhost:8080/';
if (process.env.NODE_ENV === 'production') {
    publicPath = './';
}

const config = {
  context: __dirname,
  entry: {
    main: './frontend/js/index.js',
  },
  watch: process.env.NODE_ENV !== 'production',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  resolve: { symlinks: false },
  output: {
    path: path.resolve('./bundles'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-2'],
          plugins: [p],
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => (
                [
                  postcssPresetEnv(),
                  require('autoprefixer')
                ]
              )
            },
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|ico|jpg|png|svg)$/,
        include: [
          path.resolve(__dirname, 'frontend/assets/images'),
          path.resolve(__dirname, 'frontend/assets/images/favicons'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath,
          }
        }],
        exclude: [
          path.resolve(__dirname, 'frontend/assets/fonts'),
          path.resolve(__dirname, 'frontend/assets/icons'),
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: path.resolve(__dirname, 'frontend/assets/fonts'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath,
          }
        }]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'frontend/assets/icons'),
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              replaceAttrValues: { '#29292d': 'currentColor' },
              svgAttributes: {
                fill: 'currentColor',
              },
            },
          },
        ],
        exclude: [
          path.resolve(__dirname, 'frontend/assets/fonts'),
          path.resolve(__dirname, 'frontend/assets/images')
        ]
      }
    ]
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name]-[hash].js';
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new UglifyJSPlugin(),
    new BundleTracker({ filename: './webpack-stats.json' })
  ];
} else {
  config.output.filename = '[name].bundle.js';
  config.devtool = 'cheap-eval-inline-source-map';
  // config.devtool = 'source-map';
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new BundleTracker({ filename: './webpack-stats.json' })
  ];
}

module.exports = config;
