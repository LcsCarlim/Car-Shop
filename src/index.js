const express = require('express');

const mongoose = require('mongoose');

const routes = require('../src/routes');

async function open (uri) {
  await mongoose.connect(uri);
}

const app = express();

app.use(express.json());

app.use(routes);

module.exports = { app, open, routes };
