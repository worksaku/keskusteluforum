const express = require('express');
const http = require('http');

require('./db/mongoose');
const userRouter = require('./routers/user');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(userRouter);

module.exports = server;
