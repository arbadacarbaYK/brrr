const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  entry: './src/index.tsx',
  output: {
    filename: 'brrr.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: env.prod ? '/brrr/' : '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    proxy: {
      '/api/proxy': {
        target: 'https://nfc-brrr.biz',
        secure: true,
        changeOrigin: true,
      },
    },
  },
});
