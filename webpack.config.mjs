import { resolve as _resolve, join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __dirname = _resolve();

const webpackConfig = {
  entry: {
    index: _resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: _resolve(__dirname, 'dist'),
  },
  devServer: {
    hot: true,
    open: true,
    static: { directory: join(__dirname, 'public') },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: _resolve(__dirname, 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: _resolve(__dirname, 'public', 'api'),
          to: 'api',
        },
        {
          from: _resolve(__dirname, 'public', 'images'),
          to: 'images',
        },
      ],
    }),
  ],
};

export default webpackConfig;
