const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js',
    },
    devServer: {
      proxy: {
        '/api/**': {
          target: 'http://localhost:3000/',
        },
        '/auth/**': {
          target: 'http://localhost:3000/',
        }
      },
        static: {
            directory: __dirname,
        },
        historyApiFallback: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.jsx?/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env','@babel/preset-react'],
                  plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-object-rest-spread']
                }
              }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
              
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: true, // webpack@2.x and newer
                    },
                  
                  },
                ],
              },
        ],
        // plugins: [
        //   // add the plugin to your plugins array
        //   new webpack.DefinePlugin({ `process.env.MAPBOX`: JSON.stringify(${env.MAPBOX}) })
        // ]
    },
};