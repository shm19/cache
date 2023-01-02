const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => res.send("hello world"));

module.exports = app;
