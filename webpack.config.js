process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV = 'production';
process.env.API_URL = 'http://localhost:5251'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

let config = {
  context: path.join(__dirname, '/src'), // Директория с исходным кодом приложения
  entry: 'index.js', // Главный файл приложения
  output: {
    path: path.join(__dirname, 'dist'), // Куда делать оброку
    filename: '[name].js', // Шаблон для названия файлов
    clean: true, // Очистить ./dist перед сборкой
  },
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx'], // расширения по умолчанию если не указаны в import
    modules: ['./', 'node_modules'], // Где искать файлы подключаемых модулей (пакетов)
  },
  module: {
    rules: [
      // Транспиляция JS/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      // Правила обработки подключаемых файлов
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          { loader: 'css-loader', options: { url: true, import: true } },
        ]
      },
      //Правила обработки изображений
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: f => {
              let dirNameInsideAssets = path.relative(path.join(__dirname, 'src'), path.dirname(f));
              return `${dirNameInsideAssets}/[name].[ext]`;
            }
          }
        }],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(), // Плагин для вытаскивания собранных стилей в отдельный файл
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      title: 'АКВТ.Расписание',
      favicon: './img/favicon.png',
      base: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        //API_URL: JSON.stringify(process.env.NODE_ENV === 'production' ? 'https://raspisanie.hnt8.ru':'http://hnt8.ru:1149')
        API_URL: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:5251':'http://localhost:5251')
      },
    }),
    new CompressionPlugin({
      threshold: 8192,
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ]
  },
}

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval';
  config.devServer = {
    static: path.join(__dirname, 'dist'),
    port: 8010,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        //target: 'http://hnt8.ru:1149',
        target: 'http://localhost:5251',
        secure: false,
        changeOrigin: true,
      }
    }
  };

  config.plugins.push(new BundleAnalyzerPlugin());
}
if(process.env.NODE_ENV === 'production'){
  config.devtool = 'eval';
  config.devServer = {
    static: path.join(__dirname, 'dist'),
    port: 8010,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        //target: 'http://hnt8.ru:1149',
        target: 'http://localhost:5251',
        secure: false,
        changeOrigin: true,
      }
    }
  };
}

module.exports = config;
