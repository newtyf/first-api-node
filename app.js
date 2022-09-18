require("dotenv").config()
const express = require('express');
const cors = require('cors');
const morganBody = require('morgan-body');
const { loggerStream } = require("./utils/handleLoggers");
const app = express();
const dbConnect = require('./config/mongo');

app.use(cors());
app.use(express.json());
app.use(express.static("./storage"));

morganBody(app, {
  noColors: true,
  prettify: true,
  includeNewLine: false,
  stream: loggerStream,
  skip: (req,res) => {
    return res.statusCode < 400 //TODO 2xx,3xx... < 4xx
  }
})

const port = process.env.PORT || 3000;

/**
 * Aqui invocamos a las rutas 😎
 */
// TODO localhost/api/___________
app.use("/api", require("./routes"))


app.listen(port, () => {
  console.log('Tu app esta lista por http://localhost:'+port);
});

dbConnect()