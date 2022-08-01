import express from 'express';

const config = require('./config');

const app = express();

config.initModules.forEach((init) => require(`./init/${init}`)(app));
config.middlewareModules.forEach((mw) => require(`./middleware/${mw}`)(app));
