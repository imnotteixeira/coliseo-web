import { version as reactVersion } from 'react';
import { version as reactDomVersion } from 'react-dom/server';
import { containerId } from '../shared/constants';
import webpack from "webpack";
const webpackConfig = require("../../webpack.config.js")

import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import path from 'path';
import ssrEntryPoint, { appProps } from './ssr';

import express from 'express';

console.log('Server booting...');
const isProd = process.env.NODE_ENV === 'production';
console.log('Production optimization enabled? ', isProd);
const suffix = isProd ? '.production.min.js' : '.development.js';

const compiler = webpack(webpackConfig)
const app = express()

app.use("/assets", express.static("assets"))

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true
}))

app.use(webpackHotMiddleware(compiler))

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, './views'))
app.get("/", (req, res) => {
    res.render("index", {
        reactVersion,
        reactDomVersion,
        suffix,
        containerId,
        body: ssrEntryPoint,
        context: JSON.stringify({
            initialState: appProps
        })
    })
});

app.listen(4000, () => { console.log("Server started") })