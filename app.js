require("dotenv").config()
const express = require('express');
const cors = require('cors');
const app = express();
const dbConnect = require('./config/mongo')

app.use(cors());
app.use(express.json());
app.use(express.static("./storage"));

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