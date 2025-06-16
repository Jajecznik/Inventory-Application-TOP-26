const dotenv = require('dotenv').config();;
const express = require('express');
const app = express();
const path = require('node:path');

const indexRouter = require('./routes/indexRouter');

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on http://${process.env.APP_ADDRESS}:${process.env.APP_PORT}`);
});