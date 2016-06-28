'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
    //исходный файл
    entry: "./src/main",

    //файл на выходе
    output: {
        path: __dirname + "/build",
        filename: "build.js",
        //глобальная переменная или объект с экспортированными функциями
        library: "main "
    },

    //автоматическая пересборка только в деве
    watch: NODE_ENV == 'development',

    //пересборка через .1s после сохранения файла
    watchOptions: {
        aggregateTimeout: 100
    },

    //карта кода только в деве
    devtool: NODE_ENV == 'development' ? "eval" : null,

    //плагины и переменные, которы будут доступны в модулях
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ],

    //настройки поиска модулей
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    //применяем внешние трансформаторы к определенным файлам
    module: {
        preLoaders: [ //добавили ESlint в preloaders
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015,plugins[]=transform-es2015-modules-commonjs',
            plugins: ['transform-runtime'],
            exclude: /node_modules/
        }]
    },

    eslint: {
        configFile: path.resolve(__dirname, ".eslintrc")
    }
};

//сожмем для прода
if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}