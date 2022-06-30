var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var clusterRouter = require("./cluster");

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/cluster/", clusterRouter);

module.exports = app;