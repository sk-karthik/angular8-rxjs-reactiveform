const routes = require('express').Router();
//exports.user = require("./user.js");

const user = require('./user');

routes.use('/', user);
module.exports = routes;

